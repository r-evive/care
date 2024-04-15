import { TCaregiverDetails } from "@/types/User";
import { FcCalendar } from "react-icons/fc";
import Dates from "./Dates/Dates";

type Props = {
    caregiver: TCaregiverDetails;
}


export const Side = (props:Props) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-nowrap items-center">
                <img src="https://avatar.iran.liara.run/public/boy" className="w-16 h-16 bg-gray-300 rounded-full shrink-0 mr-3"></img>
                <div className="flex items-center flex-wrap">
                    <h1 className="text-lg w-full">{props?.caregiver?.firstName} {props?.caregiver?.lastName}</h1>
                    <h4 className="text-sm">Opiekun osób starszych</h4>
                </div>
            </div>
            <hr className="w-full border-t-2 border-gray-200 my-4"/>
            <div className="flex flex-nowrap items-center">
                <div className="w-16 h-16 mt-5">
                    <FcCalendar className="w-10 h-10"/>
                </div>
                <div className="flex items-center flex-wrap">
                    <Dates/>
                </div>
            </div>
        </div>
    )
}