"use client";

import { useCaregiverRole } from "@/client/hooks/useCaregiverRole";
import { useChangeStatusMutation } from "@/store/api/reservations";
import { TReservationDetails } from "@/types/Reservation"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";


type ReservationProps = {
    reservation: TReservationDetails
}

const Manage = ({reservation}: ReservationProps) => {
    const session = useSession();
    const [changeStatus] = useChangeStatusMutation();
    const router = useRouter();
    const caregiverRole = useCaregiverRole();

    const handleStatusChange = async (status: string) => {
        changeStatus({reservationID: reservation._id, status: status}).unwrap().then(() => {
            router.refresh();
        }).catch(() => {
            console.log('Error')
        });
    }

    if(reservation.status !== 'pending' || !caregiverRole) return;

    return (
        <div className="flex flex-row flex-wrap justify-end">
            <h3 className="text-right w-full font-semibold text-gray-500">Zarządzaj</h3>
            <div className="flex gap-2 mt-5">
                <button type="button" className="focus:outline-none text-white font-semibold bg-red-600 hover:bg-red-800 rounded-lg text-sm px-5 py-2 mb-2 flex flex-nowrap items-center" onClick={() => handleStatusChange("cancelled")}><FaTimes className="mr-2"/>Anuluj</button>
                <button type="button" className="focus:outline-none text-white font-semibold bg-green-600 hover:bg-green-800 rounded-lg text-sm px-5 py-2 mb-2 flex flex-nowrap items-center" onClick={() => handleStatusChange("confirmed")}><FaCheck className="mr-2"/> Potwierdź</button>
            </div>
        </div>
    )
}

export default Manage