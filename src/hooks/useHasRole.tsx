import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import Users, { TUser } from "@/models/Users";
import { getServerSession } from "next-auth";


export default async function useHasRole(role: string):Promise<boolean> {
    await connectDatabase();
    let userSession = await getServerSession(authOptions);

    if(userSession?.user?._id) {
        let userData:TUser = await Users.findOne({_id: userSession?.user?._id}).exec();

        if(!userData)
            return false;

        if(userData && !userData.role)
            userData.role = 'user';

        if(userData.role === role){
            return true;
        }
    }
    
    return false;
}