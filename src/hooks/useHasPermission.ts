import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import { Roles} from "@/models/Permissions";
import Users, { TUser } from "@/models/Users";
import { TRole } from "@/types/Permission";
import { getServerSession } from "next-auth";


const getUserRole = async (userData: TUser):Promise<TRole> => {
    if(!userData || !userData.role)
        return Roles.find((role) => role.name === 'user') as TRole;

    let roleFound = Roles.find((role) => role.name === userData.role) as TRole;
    
    if(!roleFound)
        return Roles.find((role) => role.name === 'user') as TRole;

    return roleFound;
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