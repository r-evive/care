import { TReservationDetails } from "@/types/Reservation"
import Details from "./Details/Details"
import Manage from "./Manage/Manage"

type ReservationProps = {
    reservation: TReservationDetails
}

const Reservation = ({reservation}:ReservationProps) => {

    return (
        <div className="2xl:px-40 p-0">
            <div className="w-full p-6 mt-8 bg-white border border-gray-200 rounded-lg shadow flex md:flex-row flex-col">
            <div className="grid grid-flow-row gap-3 md:grid-flow-col md:grid-cols-4 w-full">
                <div className="md:col-span-3 col-span-1">
                    <Details reservation={reservation}/>
                </div>
                <div className="col-span-1">
                    <Manage reservation={reservation}/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Reservation