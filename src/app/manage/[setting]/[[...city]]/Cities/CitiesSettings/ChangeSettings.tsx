"use client"

import { ReactNode, useState } from "react";
import { TCaregiverProfile } from "@/types/User";
import { TCity } from "@/models/City";
import { FaCog } from "react-icons/fa";
import CitiesModal from "./CitiesModal/CitiesModal";

type ChangeSettingsProps = {
    city: TCity | null
    label?: ReactNode
}

export const CitiesSettings = (props:ChangeSettingsProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    }

    const onCLose = () => {
        setIsOpen(false);
    }

    return (
        <>
            <button type="button" className={`text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 flex`} onClick={handleClick}>{props.label || <FaCog/>}</button>
            <CitiesModal isOpen={isOpen} onClose={onCLose} city={props.city}/>
        </>
    )
}