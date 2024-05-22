import { GetUserReservations } from "@/controllers/Reservation";
import NavLayout from "@/layouts/NavLayout/NavLayout";
import ProfileLayout from "@/layouts/ProfileLayout/ProfileLayout";
import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";
import { useRouter } from 'next/navigation'
import ReservationButton from "../reservation/[...slug]/Reservation/Content/ReservationButton/ReservationButton";
import Reservation from "./Reservation/Reservations";

export default async function MyReservations() {
    const userSession = await getServerSession(authOptions);

    const userReservations = await GetUserReservations(userSession?.user?._id || '')

    return (
        <NavLayout>
            {userReservations.map((reservation) => {
                return <Reservation key={reservation._id} reservation={reservation}/>;
            })}
        </NavLayout>
    );
}