'use client';

import { updateUserSettings } from "@/controllers/User";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast, useToast } from "react-toastify";
import { useForm } from 'react-hook-form';

type SettingsFormsInputs = {
    firstName: string;
    lastName: string;
}

const SettingsForm = () => {
    const { data: session, update } = useSession();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<SettingsFormsInputs>({
        criteriaMode: "all",
        defaultValues: {
            firstName: session?.user?.firstName,
            lastName: session?.user?.lastName
        }
    });

    const [state, formAction] = useFormState(updateUserSettings, {});


    useEffect(() => {
        if (!state)
            return;

        if (!state.success) {
            toast.error(state.message);
            return;
        }

        toast.success('Pomyślnie zaktualizowano ustawienia!');
        let newSession = {
            ...session,
            user: {
                ...session?.user,
                firstName: state.firstName,
                lastName: state.lastName
            }
        }

        update(newSession);
    }, [state])

    useEffect(() => {
        if (session?.user?.firstName && session?.user?.lastName) {
            reset({
                firstName: session?.user?.firstName,
                lastName: session?.user?.lastName
            });
        }

    }, [session]);


    return (
        <form action={formAction}>
            <h2 className="text-xl font-bold mb-5">Ustawienia konta</h2>

            <div className="container m-auto grid grid-cols-3 gap-5">
                <div className="mb-5">
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 ">Imię:</label>
                    <input type="text" {...register('firstName')} name="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:outline-blue-600" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 ">Nazwisko:</label>
                    <input type="text" {...register('lastName')}  name="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:outline-blue-600" required />
                </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 text-sm relative md:mr-14 w-full" type="submit">Zapisz</button>
        </form>)
}

export default SettingsForm;