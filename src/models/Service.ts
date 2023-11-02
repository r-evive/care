import { Schema, model, models } from "mongoose";

export type TService = {
    _id?: string;
    name: string;
    description: string;
    city: string;
}

export const ServiceSchema = new Schema({
    name: {
        required: true,
        trim: true,
        type: String,
        index: true
    },
    description: {
        required: true,
        trim: true,
        type: String
    },
    city: {
        required: true,
        trim: true,
        type: String,
        index: true
    }
})

export default models.Service ?? model('Service', ServiceSchema, 'services');