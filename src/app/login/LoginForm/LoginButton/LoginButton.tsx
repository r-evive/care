"use client";

import Loader from '@/client/components/Loader/Loader';
import { useState, useRef, useEffect } from 'react';
import { LoginFormInputs } from '@/types/Login';
import React from 'react'
import Dot from './Dot/Dot';
import { clear } from 'console';

type Props = {
    loginInProgress: boolean;
    handleFormSubmit: (data: LoginFormInputs) => Promise<void>;
}

const LoginButton = (props: Props) => {
    const isMounted = useRef(true);
    const [currentDots, setCurrentDots] = useState(0);
    const dotChangeInterval = useRef<NodeJS.Timeout>();

    const generateDots = () => {
        let dots = [];

        for (let i = 0; i < 3; i++) {
            dots.push(<Dot active={i < currentDots} />)
        }

        return dots.map(dot => dot);
    }

    useEffect(() => {
        isMounted.current = true;

        clearInterval(dotChangeInterval.current);
        dotChangeInterval.current = setInterval(() => {
            if (isMounted.current) {
                setCurrentDots(prev => prev >= 3 ? 0 : prev + 1);
            }
        }, 300);

        return () => {
            isMounted.current = false;
        }
    })

    return (
        <button type="submit" className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center">
            {props.loginInProgress ? (<><Loader />Trwa logowanie{generateDots()}</>) : 'Zaloguj'}
        </button>
    )
}

export default LoginButton