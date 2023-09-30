"use client";

import { axiosAuth } from "@/lib/axios";
import { signOut, useSession } from "next-auth/react"
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
    const {data:session, update} = useSession();
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = axiosAuth.interceptors.request.use((config) => {
            if(!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${session?.user?.accessToken}`

            }
            return config;
        },(error) => {
                return Promise.reject(error);
            }
        )

        const responseInterceptor = axiosAuth.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            console.log('INTERCEPTOR ERROR', error);
            const previousRequest = error.config;

            if(error.response?.status === 401 && !previousRequest.sent){
                try{
                    previousRequest.sent = true;
                    await refreshToken();
                    previousRequest.headers.Authorization = `Bearer ${session?.user?.accessToken}`;
                    return axiosAuth(previousRequest);
                }
                catch(error){
                    console.log(error);
                }
            }
            
            signOut();
            return Promise.reject(error);
        });


        return () => {
            axiosAuth.interceptors.request.eject(requestInterceptor);
            axiosAuth.interceptors.response.eject(responseInterceptor);
        }
    }, [session])

    return axiosAuth;
}

export default useAxiosAuth;