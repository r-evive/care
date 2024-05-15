import { GetUserRole, GetUsersList } from "@/controllers/Manage";
import { GetAllReservations } from "@/controllers/Reservation";
import { TReservation } from "@/models/Reservation";
import { TReservationDetails } from "@/types/Reservation";
import moment from "moment";

type ReservationsListProps = {

}

const Reservations = async (props: ReservationsListProps) => {

    const reservations:TReservationDetails[] = await GetAllReservations();

    return (
        <>
            <h2 className="text-xl font-bold mb-5">Rezerwacje</h2>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Opiekun
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Klient
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Data
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Usługa
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, index) => {
                        return (
                            <tr className="odd:bg-white even:bg-gray-50" key={reservation._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {reservation.caregiver?.firstName} {reservation.caregiver?.lastName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {reservation.client?.firstName} {reservation.client?.lastName}
                                </td>
                                <td className="px-6 py-4 flex flex-wrap max-w-40">
                                    <span>
                                        {moment(reservation.startTime).format('DD.MM.YYYY HH:mm')}
                                    </span>
                                    <span>
                                        {moment(reservation.endTime).add(2, 'hours').format('DD.MM.YYYY HH:mm')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {reservation.service?.name}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Reservations