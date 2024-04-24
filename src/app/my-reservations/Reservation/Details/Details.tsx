import { TReservationDetails } from "@/types/Reservation";
import { Days, MonthsGenitive } from "@/utils/months";

type ReservationProps = {
    reservation: TReservationDetails
}

const Details = ({reservation}: ReservationProps) => {

    const getNiceDate = (date: Date | string) => {
        if(!date) return ''

        if(typeof date === 'string') {
            date = new Date(date)
        }

        const day = Days[date.getDay()]
        const month = MonthsGenitive[date.getMonth()]
        const year = date.getFullYear()

        return `${day}, ${date.getDate()} ${month} ${year}`
    }

    const getReservationTimeRange = () => {
        if(!reservation.startTime || !reservation.endTime) return ''

        const startDate = new Date(reservation.startTime)
        const endDate = new Date(reservation.endTime)

        return `${addLeadingZero(startDate.getHours())}:${addLeadingZero(startDate.getMinutes())} - ${addLeadingZero(endDate.getHours())}:${addLeadingZero(endDate.getMinutes())}`
    }

    const addLeadingZero = (value: number) => {
        return value < 10 ? `0${value}` : value
    }

    return (
        <>
            <div className="flex flex-nowrap w-full pb-5 border-b-2">
                    <div>
                        <img src="https://avatar.iran.liara.run/public/boy" alt="Placeholder" className="w-16 h-16 object-contain rounded-full border-2 border-gray-300 mr-4" />
                    </div>
                <div className="w-full flex-1 flex items-center">
                    <div>
                        <h2 className="text-xl font-bold pb-1 mt-1">{reservation.caregiver?.firstName} {reservation.caregiver?.lastName}</h2>
                        <h4 className="text-md font-light text-blue-700">{reservation.service?.name}</h4>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 mt-5">
                <div className="col">
                    <div className="flex flex-nowrap w-full">
                        <span className="text-md mr-5">Data rezerwacji:</span>
                        <span className="text-md font-bold">{getNiceDate(reservation.startTime)}</span>
                    </div>
                </div>
                <div className="col md:mt-0 mt-3">
                    <div className="flex flex-nowrap w-full">
                        <span className="text-md mr-5">Czas rezerwacji:</span>
                        <span className="text-md font-bold">{getReservationTimeRange()}</span>
                    </div>
                </div>
            </div>


            <div className="grid grid-flow-row gap-3 w-full mt-3 mb-5">
                <div className="flex flex-nowrap w-full">
                    <span className="text-md mr-5">Adres:</span>
                    <span className="text-md font-bold">{reservation.address.street}, {reservation.address.code} {reservation.address.city}</span>
                </div>
                <div className="flex flex-nowrap w-full">
                    <span className="text-md mr-5">Osoba:</span>
                    <span className="text-md font-bold">{reservation.person.firstName} {reservation.person.lastName}</span>
                </div>
            </div>

        </>
    );
}

export default Details;