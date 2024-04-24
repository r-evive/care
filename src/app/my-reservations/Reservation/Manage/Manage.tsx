import { TReservationDetails } from "@/types/Reservation"
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";


type ReservationProps = {
    reservation: TReservationDetails
}

const Manage = ({reservation}: ReservationProps) => {
    return (
        <div className="flex flex-row flex-wrap justify-end">
            <h3 className="text-right w-full font-semibold text-gray-500">Zarządzaj</h3>
            <div className="flex gap-2 mt-5">
                <button type="button" className="focus:outline-none text-white font-semibold bg-red-600 hover:bg-red-800 rounded-lg text-sm px-5 py-2 mb-2 flex flex-nowrap items-center"><FaTimes className="mr-2"/>Anuluj</button>
                <button type="button" className="focus:outline-none text-white font-semibold bg-green-600 hover:bg-green-800 rounded-lg text-sm px-5 py-2 mb-2 flex flex-nowrap items-center"><FaCheck className="mr-2"/> Potwierdź</button>
            </div>
        </div>
    )
}

export default Manage