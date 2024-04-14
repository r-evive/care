import connectDatabase from "@/lib/mongodb";
import Users from "@/models/Users";
import { TCaregiverDetails } from "@/types/User";

export const GetCaregiverDetails = async (caregiverId: string): Promise<TCaregiverDetails | null> => {
    await connectDatabase();

    if(!caregiverId) return null;

    let caregiver:TCaregiverDetails | null = await Users.findById(caregiverId, {
        firstName: 1,
        lastName: 1,
        description: 1,

    }).lean();

    return caregiver;
}