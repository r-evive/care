"use client"

import { useState } from "react";
import CaregiverSettingsModal, { CityOption, ServiceOption } from "./CaregiverSettingsModal/CaregiverSettingsModal"
import { TCaregiverProfile } from "@/types/User";
import { TCity } from "@/models/City";

type ChangeSettingsProps = {
    caregiver: TCaregiverProfile;
    cities: TCity[];
    selectedCity: CityOption;
    selectedService: ServiceOption;
}

export const ChangeSettings = (props:ChangeSettingsProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    }

    const onCLose = () => {
        setIsOpen(false);
    }

    return (
        <>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={handleClick}>Zmień</button>
            <CaregiverSettingsModal isOpen={isOpen} onClose={onCLose} caregiver={props.caregiver} cities={props.cities} selectedCity={props.selectedCity} selectedService={props.selectedService}
            />
        </>
    )
}