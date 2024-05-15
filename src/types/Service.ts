import { AvailabilityScope } from "./User";

export type TSearchService = {

}

export type TServiceUser = {
    _id: string;
    firstName: string;
    lastName: string;
    availability: AvailabilityScope[];
    description: string;
}

export type TCityManage = {
    _id?: string;
    name: string;
    country: string;
    editing: boolean;
}


export type TServiceManage = {
    _id?: string;
    name: string;
    city?: string;
    editing: boolean;
}