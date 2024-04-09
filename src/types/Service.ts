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