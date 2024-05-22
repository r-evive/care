import connectDatabase from "@/lib/mongodb";
import Reservation, { TReservation } from "@/models/Reservation";
import { TService } from "@/models/Service";
import Users from "@/models/Users";
import { TReservationCreate, TReservationDetails } from "@/types/Reservation";
import { AvailabilityBlock, AvailabilityScope, ReservationAvailability, ReservationUserPersonAddress, TCaregiverDetails, TClientDetails, UserAddress, UserPerson } from "@/types/User";
import moment from "moment";
import { GetServiceDetails } from "./Services";
import { GetClientDetails } from "./User";

export const GetCaregiverDetails = async (caregiverId: string): Promise<TCaregiverDetails | null> => {
    await connectDatabase();

    if(!caregiverId) return null;

    let caregiver:TCaregiverDetails | null = await Users.findById(caregiverId, {
        firstName: 1,
        lastName: 1,
        description: 1,

    }).lean();

    return caregiver;
}

export const CreateReservation = async (reservationData: TReservationCreate) => {
    await connectDatabase();

    let creatorProfile: ReservationUserPersonAddress | null = await Users.findById(reservationData.clientID, {
        people: 1,
        addresses: 1,
    }).lean();


    let personData:UserPerson | undefined = creatorProfile?.people?.find((person:UserPerson) => person.id === reservationData.personID);
    let addressData:UserAddress | undefined = creatorProfile?.addresses?.find((address:UserAddress) => address.id === reservationData.addressID);

    if(!personData || !addressData)
        throw new Error("Person or Address not found");

    let caregiverDetails: ReservationAvailability | null = await Users.findById(reservationData.caregiverID, {
        availability: 1
    }).lean();

    if(!caregiverDetails)
        throw new Error("Caregiver not found");

    let availabilityBlocks:AvailabilityBlock[] | undefined= caregiverDetails?.availability?.find((availability:AvailabilityScope) => moment(availability.date).isSame(reservationData.startTime, 'day'))?.blocks;

    if(!availabilityBlocks)
        throw new Error("Availability not found");

    let isAvailable = true;

    for(let block of availabilityBlocks){
        if(block.startTime.getTime() >= reservationData.startTime.getTime() && block.endTime.getTime() <= reservationData.endTime.getTime()){
            if(block.status !== "free"){
                isAvailable = false;
                break;
            }
        }
    }

    if(!isAvailable)
        throw new Error("Caregiver not available");

    let reservation = new Reservation({
        caregiverID: reservationData.caregiverID,
        clientID: reservationData.clientID,
        serviceID: reservationData.serviceID,
        startTime: reservationData.startTime,
        endTime: reservationData.endTime,
        status: "pending",
        person: personData,
        address: addressData,
    })


    let reservationID:TReservation = await reservation.save();

    await Users.updateOne({
        _id: reservationData.caregiverID,
        "availability.date": moment(reservationData.startTime).startOf('day').toDate(),
    }, {
        $set: {
            "availability.$.blocks": availabilityBlocks.map((block:AvailabilityBlock) => {
                if(reservationData.startTime.getTime() === reservationData.endTime.getTime() && block.startTime.getTime() === reservationData.startTime.getTime() && block.endTime.getTime() === reservationData.endTime.getTime()){
                    block.status = "booked";
                    block.reservationId = reservationID._id?.toString();
                }
                else if(block.startTime.getTime() >= reservationData.startTime.getTime() && block.endTime.getTime() <= reservationData.endTime.getTime()){
                    block.status = "booked";
                    block.reservationId = reservationID._id?.toString();
                }
                return block;
            })
        }
    });
}

export const GetReservationDetails = async (reservationId: string | undefined | null): Promise<TReservationDetails | null> => {
    await connectDatabase();

    if(!reservationId) return null;

    let reservationDetails:TReservation | null = await Reservation.findById(reservationId).lean();

    if(!reservationDetails?._id)
        return null;

    let caregiverDetails:TCaregiverDetails | null = reservationDetails?.caregiverID ?  await GetCaregiverDetails(reservationDetails?.caregiverID) : null;
    let serviceDetails:TService | null = reservationDetails?.serviceID ? await GetServiceDetails(reservationDetails?.serviceID) : null;
    let clientDetails:TClientDetails | null = reservationDetails?.clientID ? await GetClientDetails(reservationDetails?.clientID) : null;


    let reservationData:TReservationDetails = {
        _id: reservationDetails?._id?.toString(),
        caregiver: caregiverDetails,
        client: clientDetails,
        service: serviceDetails,
        startTime: reservationDetails?.startTime.toString(),
        endTime: reservationDetails?.endTime.toString(),
        person: reservationDetails?.person,
        address: reservationDetails?.address,
        status: reservationDetails?.status
    }

    return reservationData;
}

export const GetUserReservations = async (userId: string): Promise<TReservationDetails[]> => {
    await connectDatabase();

    if(!userId) return [];

    let currentDate = moment().startOf('day').toDate();

    let reservations:TReservation[] = await Reservation.find({
        clientID: userId,
        endTime: {
            $gte: currentDate
        }
    }).sort({startTime: -1}).lean();

    if(!reservations)
        return [];

    let reservationsData: TReservationDetails[] = [];

    for(let reservation of reservations){
        let reservationDetails:TReservationDetails | null = await GetReservationDetails(reservation._id);
        if(reservationDetails)
            reservationsData.push(reservationDetails);
    }

    return reservationsData;
}

export const GetAllReservations = async (): Promise<TReservationDetails[]> => {
    await connectDatabase();

    let reservations:TReservation[] = await Reservation.find().sort({startTime: -1}).lean();

    let reservationsDetails:TReservationDetails[] = [];

    for(let reservation of reservations){
        let reservationDetails:TReservation | null = await Reservation.findById(reservation._id).lean();

        if(!reservationDetails?._id)
            continue;

        let caregiverDetails:TCaregiverDetails | null = reservationDetails?.caregiverID ?  await GetCaregiverDetails(reservationDetails?.caregiverID) : null;
        let serviceDetails:TService | null = reservationDetails?.serviceID ? await GetServiceDetails(reservationDetails?.serviceID) : null;
        let clientDetails:TClientDetails | null = reservationDetails?.clientID ? await GetClientDetails(reservationDetails?.clientID) : null;


        let reservationData:TReservationDetails = {
            _id: reservationDetails?._id?.toString(),
            caregiver: caregiverDetails,
            client: clientDetails,
            service: serviceDetails,
            startTime: reservationDetails?.startTime.toString(),
            endTime: reservationDetails?.endTime.toString(),
            person: reservationDetails?.person,
            address: reservationDetails?.address,
            status: reservationDetails?.status
        }

        reservationsDetails.push(reservationData);
    }

    return reservationsDetails;
}


export const ChangeReservationStatus = async (reservationData: {reservationID: string, status: string}) => {
    await connectDatabase();

    let reservationDetails:TReservation | null = await Reservation.findById(reservationData.reservationID).lean();

    if(!reservationDetails?._id)
        throw new Error("Reservation not found");

    await Reservation.updateOne({
        _id: reservationData.reservationID
    }, {
        $set: {
            status: reservationData.status
        }
    })
}