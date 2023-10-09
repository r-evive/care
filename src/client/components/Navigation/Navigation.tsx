"use client";
import { use, useRef, useState } from 'react'
import { useOutsideClick } from '@/client/hooks/useOutsideClick'

import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import { useGetRoleLabel } from '@/client/hooks/useGetRoleLabel';

type Props = {}

const Navigation = (props: Props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropDownRef = useRef(null);
    const dropDownOutsideClick = useOutsideClick(dropDownRef, () => setIsDropdownOpen(false));
    const session = useSession();
    const roleLabel = useGetRoleLabel(session?.data?.user?.role);

    const handleDropDownClick = () => {
        setIsDropdownOpen((prevState) => !prevState);
    }

    const getUserFullName = () => {
        if (session?.data?.user?.firstName && session?.data?.user?.lastName) {
            return `${session?.data?.user?.firstName} ${session?.data?.user?.lastName}`
        }
        return 'Użytkownik';
    }

    const handleLogout = async () => {
        console.log('Logout')
        await signOut();
    }

    return (
        <>
            <nav className="bg-white border-gray-200 w-full shadow">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap ">Care+</span>
                    </a>
                    <div className="relative flex items-center md:order-2 xs:mt-5">
                        <div className="relative" ref={dropDownRef}>
                            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0" onClick={handleDropDownClick}>
                                <img className="w-8 h-8 rounded-full" src="https://www.w3schools.com/howto/img_avatar.png"/>
                            </button>

                            <div className={`absolute right-0 top-12 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100  min-w-[150px] max-w-[300px] rounded-lg shadow ${isDropdownOpen ? 'block': 'hidden'}`}>
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 ">{getUserFullName()}</span>
                                    <span className="block text-sm  text-gray-500 truncate">{roleLabel}</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li onClick={handleLogout}>
                                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer hover:text-blue-500">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-user" aria-expanded="false">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">About</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Services</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Pricing</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navigation