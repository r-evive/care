import { useAddPersonMutation, useUpdatePersonMutation } from "@/store/api/users";
import { UserPerson } from "@/types/User";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BiPlusCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";

type AddPersonProps = {
    mode: "add" | "edit";
    display: "block" | "form",
    toggleActive?: (value:boolean) => void;
    resetPerson?: () => void;
    personValue?: (UserPerson | null);
}


const AddPerson = (props:AddPersonProps) => {
    const router = useRouter();

    const [pickerDate, setPickerDate] = useState<Date | null>(props?.personValue?.birthDate ? new Date(props.personValue.birthDate) : null);

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserPerson>({
        criteriaMode: "all",
        defaultValues: {
            firstName: props.personValue ? props.personValue.firstName : "",
            lastName: props.personValue ? props.personValue.lastName : "",
        }
    });

    const [addPerson] = useAddPersonMutation();
    const [updatePerson] = useUpdatePersonMutation();

    const handleOnBlockClick = () => {
        if(props.toggleActive)
            props.toggleActive(true);
    }

    const handleOnFormSubmit = (data:UserPerson) => {
        if(!props.personValue){
            if(!pickerDate) return;
            addPerson({...data, birthDate: pickerDate}).unwrap().then((res) => {
                if(props.toggleActive)
                    props.toggleActive(false);

                router.refresh();
            }).catch((err) => {
                toast.error('Coś poszło nie tak! Spróbuj ponownie później!');
            });
        }
        else{
            if(!pickerDate) return;
            updatePerson({id: props.personValue.id, ...data, birthDate: pickerDate}).unwrap().then((res) => {
                if(props.toggleActive)
                    props.toggleActive(false);
                if(props.resetPerson)
                    props.resetPerson();

                router.refresh();
            }).catch((err) => {
                toast.error('Coś poszło nie tak! Spróbuj ponownie później!');
            });
        }

    }

    const pickerOnChange = (date: Date) => {
        setPickerDate(date);
    }

    const handleOnCancelClick = () => {
        if(props.toggleActive)
            props.toggleActive(false);
        if(props.resetPerson)
            props.resetPerson();
    }

    return(
        <>
            {props.display === "block" ?
            <div className="w-full p-10 bg-gray-100 rounded border transition cursor-pointer hover:bg-blue-200" onClick={handleOnBlockClick}>
                <div className="flex justify-center items-center gap-2">
                    <span className="text-xl"><BiPlusCircle/></span>
                    <span className="text-md">Dodaj nową osobę</span>
                </div>
            </div> : null}

            {props.display === "form" ?
            <form className="w-full mb-10" onSubmit={handleSubmit(handleOnFormSubmit)} onReset={handleOnCancelClick}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    <div className="mb-1">
                        <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900 ">Imię:</label>
                        <input type="text" {...register('firstName')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:outline-blue-600" required />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 ">Nazwisko:</label>
                        <input type="text" {...register('lastName')}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:outline-blue-600" required />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 ">Data urodzenia:</label>
                        <ReactDatePicker onChange={pickerOnChange} selected={pickerDate} dateFormat="dd/MM/YYYY" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:outline-blue-600" required/>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="col-start-1 md:col-start-2">
                        <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 text-sm relative md:mr-14 w-full" type="reset">Anuluj</button>
                    </div>
                    <div className="col-start-1 md:col-start-3">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 text-sm relative md:mr-14 w-full" type="submit">{props.personValue ? 'Zapisz osobę' : 'Dodaj osobę'}</button>
                    </div>
                </div>
            </form> : null}
        </>
    )
}

export default AddPerson;