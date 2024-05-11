import connectDatabase from "@/lib/mongodb";
import Users from "@/models/Users";
import { TCaregiverProfile, TUserProfile } from "@/types/User";


export const GetUsersList = async (): Promise<TUserProfile[]> => {
    await connectDatabase();
    let users:TUserProfile[] = await Users.find({}, {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        role: 1,
    }).lean();

    return users;
}

export const GetCaregiversList = async (): Promise<TCaregiverProfile[]> => {
    await connectDatabase();
    let caregivers:TCaregiverProfile[] = await Users.find({role: 'caregiver'}, {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        role: 1,
        description: 1,
        city: 1,
        service: 1,
    }).lean();

    return caregivers;
}

export const GetUserRole = (role: string): string => {
    switch(role){
        case 'admin':
            return 'Administrator';
        case 'caregiver':
            return 'Opiekun';
        case 'user':
            return 'Użytkownik';
        default:
            return 'Nieznany';
    }
}