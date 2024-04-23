import connectDatabase from "@/lib/mongodb";
import Reservation, { TReservation } from "@/models/Reservation";
import Users from "@/models/Users";
import { TReservationCreate } from "@/types/Reservation";
import { AvailabilityBlock, AvailabilityScope, ReservationAvailability, ReservationUserPersonAddress, TCaregiverDetails, UserAddress, UserPerson } from "@/types/User";
import moment from "moment";

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
        status: "accepted",
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
                if(block.startTime.getTime() >= reservationData.startTime.getTime() && block.endTime.getTime() <= reservationData.endTime.getTime()){
                    block.status = "booked";
                    block.reservationId = reservationID._id?.toString();
                }
                return block;
            })
        }
    });
}