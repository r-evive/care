"use client"

import { useCreateReservationMutation } from "@/store/api/reservations";
import { useAppSelector } from "@/store/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";

const ReservationButton = () => {
    const reservationContext = useAppSelector((state) => state.reservation);
    const [createReservation] = useCreateReservationMutation();
    const session = useSession();
    const router = useRouter();

    const handleCreateReservation = () => {
        console.log('Creating reservation...');
        console.log(reservationContext)

        let reservationDataSchema = z.object({
            caregiverID: z.string(),
            clientID: z.string(),
            serviceID: z.string(),
            startTime: z.string(),
            endTime: z.string(),
            personID: z.number(),
            addressID: z.number(),
        });

        let reservationData = reservationDataSchema.parse({
            caregiverID: reservationContext.caregiverId,
            clientID: session.data?.user?._id,
            serviceID: reservationContext.serviceId,
            startTime: reservationContext.startBlock?.startTime,
            endTime: reservationContext.endBlock?.endTime,
            personID: reservationContext.personId,
            addressID: reservationContext.addressId,
        });


        if(reservationData){
            createReservation(reservationData).unwrap().then(() => {
                toast.success('Rezerwacja utworzona!');
                router.push('/');
            }).catch((err) => {
                console.log(err);
                toast.error('Coś poszło nie tak!');
            });
        }
    }

    return (
        <div className="flex justify-end mt-5 mb-5">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center inline-flex items-center" onClick={handleCreateReservation}>
                Utwórz rezerwację
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
        </div>
    )
}

export default ReservationButton