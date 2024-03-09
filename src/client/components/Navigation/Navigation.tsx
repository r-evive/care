"use client";
import React from 'react'
import ControlSection from './ControlSection/ControlSection';
import { useSession } from 'next-auth/react';
import { useIsSignedIn } from '@/client/hooks/useIsSignedIn';
import LoginSection from './LoginSection/LoginSection';

type Props = {
    hasSession?: boolean
}

const Navigation = (props: Props) => {
    const isSignedIn = useIsSignedIn(props?.hasSession ?? false);

    return (
        <>
            <nav className={`bg-white border-gray-200 w-full shadow`}>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href={process.env.NEXT_PUBLIC_URL} className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" style={{minWidth: '32px'}}/>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap ">Care+</span>
                    </a>
                    {isSignedIn ? <ControlSection /> : <LoginSection/>}
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