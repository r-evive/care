import { Schema, model, models } from "mongoose";

export const UserSchema = new Schema({
    email: {
        required: true,
        trim: true,
        unique: true,
        type: String,
        index: true
    },
    password: {
        required: true,
        trim: true,
        type: String
    },
    firstName: {
        trim: true,
        type: String
    },
    lastName: {
        trim: true,
        type: String
    }
})

export default models.Users ?? model('Users', UserSchema, 'users');