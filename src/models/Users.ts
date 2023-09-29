import { TPermissions } from "@/types/Permission";
import { Schema, model, models } from "mongoose";

export type TUser = {
    _id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
}

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
    },
    role: {
        type: String,
        default: 'user'
    },
    permissions: {
        type: Object,
        default: {}
    }
})

export default models.Users ?? model('Users', UserSchema, 'users');