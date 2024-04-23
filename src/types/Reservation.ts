import moment from "moment";

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
