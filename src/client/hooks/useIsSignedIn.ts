import { Roles } from "@/models/Permissions"
import { useSession } from "next-auth/react";

export const useIsSignedIn = ():boolean => {
    const session = useSession();

    if(session?.data?.user){
        return true;
    }
    return false;
}