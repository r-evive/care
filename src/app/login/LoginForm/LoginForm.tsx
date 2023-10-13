"use client";
import { handleLoginError } from '@/utils/authErrors';
import { signIn, getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import LoginButton from './LoginButton/LoginButton';
import { LoginFormInputs } from '@/types/Login';

type Props = {}


const LoginForm = (props: Props) => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormInputs>({criteriaMode: "all"});
    const router = useRouter();
    const session = useSession();
    const [loginInProgress, setLoginInProgress] = useState(false);

    useEffect(() => {
        if(session.status === 'authenticated'){
            if(!session?.data?.user)
                return;
            
            router.push(`${process.env.NEXT_PUBLIC_URL}/`);
        }
    }, [session]);

    const handleFormSubmit = async(data:LoginFormInputs ) => {
        if(loginInProgress) return;

        setLoginInProgress(true);

        const result = await signIn('credentials', {email: data.email, password: data.password, redirect: false});

        if(result && result.ok){
            const session = await getSession();

            if(!session?.user){
                setLoginInProgress(false);
                setError('email', {message: handleLoginError(result?.error ? result.error : 'Nieznany błąd')});
                return;
            }

            router.push('/');
        }
        else{
            setLoginInProgress(false);
            setError('email', {message: handleLoginError(result?.error ? result.error : 'Nieznany błąd')});
        }


    }

    const emailRules = {
        required: 'To pole jest wymagane',
        pattern: {
            message: 'Niepoprawny adres email',
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        }
    }

    const passwordRules = {
        required: 'To pole jest wymagane',
    }

    const getFieldErrorMessage = (data:any) => {
        if(typeof data === 'object') {
            return <span className="text-red-500 text-xs font-small">{data.message}</span>
        }
        return ''
    }

    const hadleRegisterRedirect = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        router.push(`${process.env.NEXT_PUBLIC_URL}/register`);
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full">
                <img src='/static/logo.png' className="object-contain w-60 h-40 mb-10" />
                <div className="flex justify-center  w-full rounded-lg shadow border md:max-w-md bg-white">
                    <form className="p-10 space-y-4 w-full" onSubmit={handleSubmit(handleFormSubmit)}>
                        <h1 className="text-2xl font-semibold text-left mb-10">Zaloguj się</h1>
                        <div className='relative'>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email:</label>
                            <input type="text" {...register('email', {...emailRules})} className={`bg-gray-50 ring-2 ring-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:text-indigo-600 focus:ring-2 focus-visible:outline-indigo-600 ${errors.email && 'ring-red-500 ring-1'}`} tabIndex={2} />
                            {getFieldErrorMessage(errors.email)}
                        </div>

                        <div className='relative'>
                            <label htmlFor="password" className="block mb-2 mt-0 text-sm font-medium text-gray-900">Hasło:</label>
                            <input type="password" {...register('password', {...passwordRules})} className={`bg-gray-50 ring-2 ring-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:text-indigo-600 focus:ring-2 focus-visible:outline-indigo-600 ${(errors.password) && 'ring-red-500 ring-1'}`}  tabIndex={3} />
                            {getFieldErrorMessage(errors.password)}
                        </div>

                        <div className='relative'>
                            <LoginButton loginInProgress={loginInProgress} handleFormSubmit={handleFormSubmit} />
                        </div>
                        <div className='relative text-center mt-20'>
                            <a className="hover:underline cursor-pointer" onClick={hadleRegisterRedirect}><span className="mr-1">Nie masz konta?</span><span className='text-indigo-600'>Zarejestruj się!</span></a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm