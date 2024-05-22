import { UserAddress, UserPerson } from "@/types/User";
import { Schema, model, models } from "mongoose";


export type TReservation = {
    _id?: string;
    caregiverID: string;
    clientID: string;
    serviceID: string;
    startTime: Date;
    endTime: Date;
    person: UserPerson;
    address: UserAddress;
    status: string;
}

export const ReservationSchema = new Schema({
    caregiverID: {
        required: true,
        type: String
    },
    clientID: {
        required: true,
        type: String
    },
    serviceID: {
        required: true,
        type: String
    },
    startTime: {
        required: true,
        type: Date
    },
    endTime: {
        required: true,
        type: Date
    },
    person: {
        required: true,
        type: Object
    },
    address: {
        required: true,
        type: Object
    },
    status: {
        required: true,
        type: String,
        default: 'pending'
    }
})

export default models.Reservations ?? model('Reservations', ReservationSchema, 'reservations');