"use client";

import { useRegisterMutation } from '@/store/api/user';
import { get } from 'http';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

type Props = {}

interface IFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
}


const RegisterForm = (props: Props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInputs>({criteriaMode: "all"});
    const [createUser] = useRegisterMutation();
    const router = useRouter();

    const handleFormSubmit = (data:IFormInputs ) => {
        createUser(data).unwrap().then((res) => {
            if(res.status === 200){
                router.push('/');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const checkboxRules = {
        required: 'Confirm that you accept the terms and conditions',
    }

    const defaultFields = {
        required: 'This field is required',
        minLength: {
            value: 3,
            message: 'This field must be at least 3 characters long'
        },
        maxLength: {
            value: 32,
            message: 'This field must be at most 32 characters long'
        },
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
        minLength: {
            value: 8,
            message: 'This field must be at least 8 characters long'
        },
        maxLength: {
            value: 32,
            message: 'This field must be at most 32 characters long'
        },
        pattern: {
            message: 'Password must contain upper/lower letters, numbers and special characters',
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        }
    }

    const repasswordValidation = (value: string) => {
        if(value !== watch('password')) {
            return 'Passwords must match'
        }
        return true
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
                        <h1 className="text-2xl font-semibold text-left mb-10">Create account</h1>
                        <div className="flex items-start justify-between space-x-5">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                                <input type="text" {...register('firstName', {...defaultFields})} className="bg-gray-50 ring-2 ring-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:text-indigo-600 focus:ring-2 focus-visible:outline-indigo-600" tabIndex={0} />
                                {getFieldErrorMessage(errors.firstName)}
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                                <input type="text" {...register("lastName", {...defaultFields})} className="bg-gray-50 ring-2 ring-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:text-indigo-600 focus:ring-2 focus-visible:outline-indigo-600" tabIndex={1} />
                                {getFieldErrorMessage(errors.lastName)}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="text" {...register('email', {...emailRules})} className="bg-gray-50 ring-2 ring-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:text-indigo-600 focus:ring-2 focus-visible:outline-indigo-600" tabIndex={2} />
                            {getFieldErrorMessage(errors.email)}
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 mt-10 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" {...register('password', {...defaultFields, ...passwordRules})} className="bg-gray-50 ring-2 ring-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:text-indigo-600 focus:ring-2 focus-visible:outline-indigo-600" tabIndex={3} />
                            {getFieldErrorMessage(errors.password)}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                            <input type="password" {...register('confirmPassword', {...defaultFields, validate: (val: string) => repasswordValidation(val)})} className="bg-gray-50 ring-2 ring-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:text-indigo-600 focus:ring-2 focus-visible:outline-indigo-600" tabIndex={4} />
                            {getFieldErrorMessage(errors.confirmPassword)}
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox" {...register('termsAccepted', {...checkboxRules})} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3" />
                            </div>
                            <label htmlFor="terms" className="font-light text-gray-500 select-none">I accept the <a className="font-medium hover:underline text-indigo-600" href="#">Terms and Conditions</a></label>
                        </div>
                        {getFieldErrorMessage(errors.termsAccepted)}
                        <div>
                            <button type="submit" className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create account</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterForm