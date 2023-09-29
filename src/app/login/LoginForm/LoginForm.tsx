"use client";
import { useRegisterMutation } from '@/store/api/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { handleLoginError } from '@/utils/authErrors';
import { get } from 'http';
import { signIn, getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

type Props = {}

interface IFormInputs {
    email: string;
    password: string;
}


const LoginForm = (props: Props) => {
    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm<IFormInputs>({criteriaMode: "all"});
    const dispatch = useAppDispatch();
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        console.log(session)
        if(session.status === 'authenticated'){
            console.log('123 session')
            if(!session?.data?.user){
                return;
            }

            router.push('/');
        }
    }, [session]);

    const handleFormSubmit = async(data:IFormInputs ) => {
        console.log('Login request');
        const result = await signIn('credentials', {email: data.email, password: data.password, redirect: false});

        if(result && result.ok){
            const session = await getSession();
            console.log(session)
            if(!session?.user){
                setError('email', {message: handleLoginError(result?.error ? result.error : 'Unknown error')});
                return;
            }

            router.push('/');
        }
        else{
            setError('email', {message: handleLoginError(result?.error ? result.error : 'Unknown error')});
        }


    }

    const emailRules = {
        required: 'This field is required',
        pattern: {
            message: 'This field must be a valid email',
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        }
    }

    const passwordRules = {
        required: 'This field is required',
    }

    const getFieldErrorMessage = (data:any) => {
        if(typeof data === 'object') {
            return <span className="text-red-500 text-xs font-small">{data.message}</span>
        }
        return ''
    }


    return (
        <>
            <div className="flex flex-col items-center justify-center mx-auto w-full mb-0 md:mb-40">
                <div className="w-full rounded-lg shadow border md:max-w-md bg-white">
                    <form className="p-10 space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
                        <h1 className="text-2xl font-semibold text-left mb-10">Login</h1>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="text" {...register('email', {...emailRules})} className="bg-gray-50 ring-2 ring-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:text-indigo-600 focus:ring-2 focus-visible:outline-indigo-600" tabIndex={2} />
                            {getFieldErrorMessage(errors.email)}
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 mt-0 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" {...register('password', {...passwordRules})} className="bg-gray-50 ring-2 ring-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:text-indigo-600 focus:ring-2 focus-visible:outline-indigo-600" tabIndex={3} />
                            {getFieldErrorMessage(errors.password)}
                        </div>

                        <div>
                            <button type="submit" className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm