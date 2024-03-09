
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