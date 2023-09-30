"use client";


import useAxiosAuth from '@/hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';
import React from 'react'

type Props = {}

const Test = (props: Props) => {
    const axiosAuth = useAxiosAuth();
    const {data: session} = useSession();

    const handleFetch = async () => {
        console.log('Session: ', session);
        let userData = await axiosAuth.get(`/api/user/${session?.user?._id}`)    
        console.log('User data: ', userData);
    }
  return (
    <button onClick={handleFetch}>Fetch user data</button>
  )
}

export default Test