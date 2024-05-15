"use client"

import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";


type ServicesButtonProps = {
    cityID: string;
}

export const ServicesButton = (props: ServicesButtonProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/manage/cities/${props.cityID}`);
    }

    return (
        <>
            <button type="button" className="text-white bg-indigo-400 hover:bg-indigo-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={handleClick}><FaArrowRight /></button>
        </>
    )
}

export default ServicesButton