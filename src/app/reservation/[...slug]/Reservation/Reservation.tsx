import ReservationLayout from "@/layouts/ReservationLayout/ReservationLayout";
import { Content } from "./Content/Content";
import { Side } from "./Side/Side";
import { TCaregiverDetails } from "@/types/User";
import { DataGuard } from "./DataGuard/DataGuard";


type Props = {
    caregiver: TCaregiverDetails;
}

const Reservation = (props:Props) => {
    return (
        <>
        <DataGuard/>
        <ReservationLayout content={<Content/>} side={<Side caregiver={props.caregiver}/>}/>
        </>
    )
}


export default Reservation;