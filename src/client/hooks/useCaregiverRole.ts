import { useSession } from "next-auth/react"

export const useCaregiverRole = () => {
    let session = useSession();

    if(session?.data?.user?.role === 'caregiver' || session?.data?.user?.role === 'admin')
        return true;

    return false;
}

