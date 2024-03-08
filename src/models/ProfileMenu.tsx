import { Schema, model, models } from "mongoose";
import { BsCalendarWeekFill, BsGearFill,BsGeoAltFill, BsPeopleFill, } from "react-icons/bs";
import { ReactElement, ReactNode } from "react";
import { JsxElement } from "typescript";

export type TProfileMenu = {
    key: number;
    label: string;
    path: string;
    icon: ReactElement | ReactNode;
    order: number;
}


export const ProfileMenu: TProfileMenu[] = [
    {
        key: 1,
        label: 'Ustawienia',
        path: '/settings',
        icon: <BsGearFill/>,
        order: 0,
    },
    {
        key: 2,
        label: 'Adresy',
        path: '/addresses',
        icon: <BsGeoAltFill/>,
        order: 1,
    },
    {
        key: 3,
        label: 'Osoby',
        path: '/people',
        icon: <BsPeopleFill/>,
        order: 2,
    },
    {
        key: 4,
        label: 'Dostępność',
        path: '/availability',
        icon: <BsCalendarWeekFill/>,
        order: 3,
    },
]

