import { BsBookFill, BsGearFill, BsHeartFill } from "react-icons/bs";
import { FaCity } from "react-icons/fa6";
import { ReactElement, ReactNode } from "react";
import { FaBook, FaUsers } from "react-icons/fa";

export type TManageMenu = {
    key: number;
    label: string;
    path: string;
    icon: ReactElement | ReactNode;
    order: number;
}


export const ManageMenu: TManageMenu[] = [
    {
        key: 1,
        label: 'Użytkownicy',
        path: '/users',
        icon: <FaUsers />,
        order: 0,
    },
    {
        key: 2,
        label: 'Opiekunowie',
        path: '/caregivers',
        icon: <BsHeartFill />,
        order: 1,
    },
    {
        key: 3,
        label: 'Rezerwacje',
        path: '/reservations',
        icon: <FaBook />,
        order: 2,
    },
    {
        key: 4,
        label: 'Miasta i usługi',
        path: '/cities',
        icon: <FaCity />,
        order: 3,
    },
]

