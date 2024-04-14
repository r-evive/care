
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
    id?: string;
    street: string;
    code: string;
    city: string;
}

export type UserPerson = {
    id?: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
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