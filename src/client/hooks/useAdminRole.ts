"use client"

import { useSession } from "next-auth/react"

const useAdminRole = () => {
    let session = useSession();

    if(session?.data?.user?.role === 'admin')
        return true;

    return false;
}

export default useAdminRole