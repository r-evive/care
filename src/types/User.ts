
export interface UserRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserRegisterInputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
}

export type UserAddress = {
    id?: number;
    street: string;
    code: string;
    city: string;
}

export type UserPerson = {
    id?: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
}

export type ReservationUserPersonAddress = {
    people: UserPerson[] | null;
    addresses: UserAddress[] | null;
}

export type AvailabilityScope = {
    id: string;
    date: Date;
    blocks: AvailabilityBlock[];
}

export type AvailabilityBlock = {
    id: string;
    startTime: Date;
    endTime: Date;
    duration: number;
    status: 'unavailable' | 'pending' | 'free' | 'booked';
    reservationId?: string;
}

export type ReservationAvailability = {
    availability: AvailabilityScope[] | undefined;
}

export type TSerializedAvailabilityBlock = {
    id: string;
    startTime: string;
    endTime: string;
    duration: number;
    status: 'unavailable' | 'pending' | 'free' | 'booked';
    reservationId?: string;
}

export type TCaregiverDetails = {
    _id: string;
    firstName: string;
    lastName: string;
    description: string;
}

export type TClientDetails = {
    _id: string;
    firstName: string;
    lastName: string;
}

export type TUserProfile = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface TCaregiverProfile extends TUserProfile{
    description: string;
    city: string;
    service: string;
}