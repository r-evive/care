"use client"

import { ReactNode, useState } from "react";

import { FaCog } from "react-icons/fa";
import ServicesModal from "./ServicesModal/ServicesModal";
import { TService } from "@/models/Service";


type ChangeSettingsProps = {
    service: TService | null
    cityID?: string
    label?: ReactNode
}

export const ServicesSettings = (props:ChangeSettingsProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    }

    const onCLose = () => {
        setIsOpen(false);
    }

    return (
        <>
            <button type="button" className={`text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 flex `} onClick={handleClick}>{props.label || <FaCog/>}</button>
            <ServicesModal isOpen={isOpen} onClose={onCLose} service={props.service} cityID={props.cityID}/>
        </>
    )
}