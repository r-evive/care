'use client';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast, useToast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { UserSettingsUpdatePayload, useUpdateUserSettingsMutation } from "@/store/api/users";

type SettingsFormsInputs = {
    firstName: string;
    lastName: string;
    description: string;
}

const SettingsForm = () => {
    const { data: session, update } = useSession();
    const [settingsUpdate] = useUpdateUserSettingsMutation();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<SettingsFormsInputs>({
        criteriaMode: "all",
        defaultValues: {
            firstName: session?.user?.firstName,
            lastName: session?.user?.lastName,
            description: session?.user?.description
        }
    });

    const handleFormSubmit = (data:UserSettingsUpdatePayload) => {
        settingsUpdate(data).unwrap().then((res) => {
            toast.success('Pomyślnie zaktualizowano ustawienia!');
            let newSession = {
                ...session,
                user: {
                    ...session?.user,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    description: data.description
                }
            }

            update(newSession);
        }).catch((err) => {
            toast.error('Coś poszło nie tak! Spróbuj ponownie później!');
        });
    }

    useEffect(() => {
        if (session?.user?.firstName && session?.user?.lastName) {
            reset({
                firstName: session?.user?.firstName,
                lastName: session?.user?.lastName,
                description: session?.user?.description
            });
        }

    }, [session]);


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <div className="mb-2">
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 ">Imię:</label>
                    <input type="text" {...register('firstName')} name="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:outline-blue-600" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 ">Nazwisko:</label>
                    <input type="text" {...register('lastName')}  name="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:outline-blue-600" required />
                </div>
            </div>

            <div className="container m-auto">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description:</label>
                <textarea {...register('description')} name="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:outline-blue-600 mb-5" required />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 text-sm relative md:mr-14 w-full" type="submit">Zapisz</button>
        </form>)
}

export default SettingsForm;