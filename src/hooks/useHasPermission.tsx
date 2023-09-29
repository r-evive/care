import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import { AdminRole, UserRole } from "@/models/Permissions";
import Users, { UserType } from "@/models/Users";
import { TRole } from "@/types/Permission";
import { getServerSession } from "next-auth";


const getUserRole = async (userId: string):Promise<TRole> => {
    await connectDatabase();
    let userData:UserType = await Users.findOne({_id: userId}).exec();

    switch(userData.role) {
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
        let userPermissions:TRole = await getUserRole(userSession.user._id);
        if(userPermissions.permissions[permission as keyof TRole]){
            return true;
        }
    }
    
    return false;
}