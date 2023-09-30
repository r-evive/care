import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import { AdminRole, UserRole } from "@/models/Permissions";
import Users, { TUser } from "@/models/Users";
import { TRole } from "@/types/Permission";
import { getServerSession } from "next-auth";


const getUserRole = async (userData: TUser):Promise<TRole> => {
    switch(userData && userData.role) {
        case 'admin':
            return AdminRole;
        case 'user':
            return UserRole;
        default:
            return UserRole;
    }
}

export default async function useHasPermission(permission: string):Promise<boolean> {
    let userSession = await getServerSession(authOptions);

    if(userSession?.user?._id) {
        await connectDatabase();
        let userData:TUser = await Users.findOne({_id: userSession?.user?._id}).exec();

        if(!userData)
            return false;

        let userPermissions:TRole = await getUserRole(userData);
        if(userPermissions.permissions[permission as keyof TRole]){
            return true;
        }
    }
    
    return false;
}