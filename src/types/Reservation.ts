import moment from "moment";
import { TCaregiverDetails, TClientDetails, UserAddress, UserPerson } from "./User";
import { TService } from "@/models/Service";

export type TReservation = {
    _id: string;
    caregiverID: string;
    clientID: string;
    serviceID: string;
    scope: TReservationScope[];
    totalDuration: number;
    status: string;
}

export type TReservationScope = {
    start: moment.Moment;
    end: moment.Moment;
    duration: number;
}

export type TReservationCreate = {
    caregiverID: string;
    clientID: string;
    serviceID: string;
    startTime: Date;
    endTime: Date;
    personID: number;
    addressID: number;
}

export type TReservationCreatePayload = {
    caregiverID: string;
    clientID: string;
    serviceID: string;
    startTime: string;
    endTime: string;
    personID: number;
    addressID: number;
}


export type TReservationDetails = {
    _id: string;
    caregiver: TCaregiverDetails | null,
    client: TClientDetails | null;
    service: TService | null;
    startTime: string;
    endTime: string;
    person: UserPerson;
    address: UserAddress;
    status: string;
}

