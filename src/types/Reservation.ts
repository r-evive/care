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