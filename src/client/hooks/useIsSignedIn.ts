import { Roles } from "@/models/Permissions"
import { useSession } from "next-auth/react";

export const useIsSignedIn = (initialValue: boolean):boolean => {
    const session = useSession();


    if(session?.data?.user){
        return true;
    }

    if(initialValue)
        return true;

    return false;
}