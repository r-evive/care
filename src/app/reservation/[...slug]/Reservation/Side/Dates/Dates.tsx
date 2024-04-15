"use client"

import { useAppSelector } from "@/store/hooks"
import { Months } from "@/utils/months";



const Dates = () => {
    const reservationDetails = useAppSelector(state => state.reservation)

    const getReservationDate = () => {
        if(!reservationDetails?.startBlock)
            return ``

        let reservationDate = new Date(reservationDetails.startBlock.startTime)

        return `${reservationDate.getDate()} ${Months[reservationDate.getMonth()]} ${reservationDate.getFullYear()}`
    }

    const getReservationTime = () => {
        if(!reservationDetails?.startBlock || !reservationDetails?.endBlock)
            return ``

        let startDate = new Date(reservationDetails.startBlock.startTime)
        let endDate = new Date(reservationDetails.endBlock.endTime)


        return `${addLeadingZero(startDate.getHours())}:${addLeadingZero(startDate.getMinutes())} - ${addLeadingZero(endDate.getHours())}:${addLeadingZero(endDate.getMinutes())}`
    }

    const addLeadingZero = (value: number) => {
        return value < 10 ? `0${value}` : value
    }

    return (
        <>
            <h4 className="text-sm w-full">{getReservationDate()}</h4>
            <h4 className="text-sm w-full">{getReservationTime()}</h4>
        </>
    )
}

export default Dates