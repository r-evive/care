"use client"

import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const DataGuard = () => {
    const router = useRouter();
    const reservationDetails = useAppSelector(state => state.reservation)

    useEffect(() => {
        if(!reservationDetails?.startBlock || !reservationDetails?.endBlock || !reservationDetails?.serviceId || !reservationDetails?.caregiverId)
            router.push('/');
    }, [])

    return null;
}