import { TPermissions } from "@/types/Permission";
import { UserAddress, UserPerson } from "@/types/User";
import { Schema, model, models } from "mongoose";
import { AvailabilityScope } from "../types/User";

export type TUser = {
    _id?: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    role: string;
    accessToken?: string;
    refreshToken?: string;
    addresses?: Array<UserAddress>;
    people?: Array<UserPerson>;
    city?: string;
    service?: string;
}

export type TUserSession = {
    _id?: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    role: string;
    accessToken?: string;
    refreshToken?: string;
    description?: string;
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
    },
    addresses: {
        type: Array,
        default: []
    },
    people: {
        type: Array,
        default: []
    },
    availability:{
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    service: {
        type: String,
        default: ''
    },
})

export default models.Users ?? model('Users', UserSchema, 'users');