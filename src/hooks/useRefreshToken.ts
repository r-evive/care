"use client";

import axios from "@/lib/axios";
import { Session } from "inspector";
import { useSession } from "next-auth/react";

type TRefreshTokenResponse = {
    accessToken?: string;
}

export const useRefreshToken = () => {
    const {data: session, update} = useSession();

    const refreshToken = async () => {
        try{
            const res = await axios.post<TRefreshTokenResponse>(`${process.env.NEXT_PUBLIC_URL}/api/user/refresh-token`, {refreshToken: session?.user?.refreshToken});
            if(session && session.user && res.data.accessToken)
                session.user.accessToken = res.data.accessToken;
        }
        catch(error){
            console.log(error);
        }
    }

    return refreshToken;
}