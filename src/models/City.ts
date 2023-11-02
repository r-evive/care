import { Schema, model, models } from "mongoose";

export type TCity = {
    _id?: string;
    name: string;
    country: string;
}

export const CitySchema = new Schema({
    name: {
        required: true,
        trim: true,
        type: String,
        index: true
    },
    country: {
        required: true,
        trim: true,
        type: String,
        index: true
    }
})

export default models.City ?? model('City', CitySchema, 'cities');