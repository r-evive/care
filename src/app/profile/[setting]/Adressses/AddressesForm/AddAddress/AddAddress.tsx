import { useAddAddressMutation, useUpdateAddressMutation } from "@/store/api/users";
import { UserAddress } from "@/types/User";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BiPlusCircle } from "react-icons/bi";
import { toast } from "react-toastify";

type AddAddressProps = {
    mode: "add" | "edit";
    display: "block" | "form",
    toggleActive?: (value:boolean) => void;
    resetAddress?: () => void;
    addressValue?: (UserAddress | null);
}

type AdressFormsInputs = {
    street: string;
    code: string;
    city: string;
}


const AddAddress = (props:AddAddressProps) => {
    const router = useRouter();

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<AdressFormsInputs>({
        criteriaMode: "all",
        defaultValues: {
            street: props.addressValue ? props.addressValue.street : "",
            code: props.addressValue ? props.addressValue.code : "",
            city: props.addressValue ? props.addressValue.city : ""
        }
    });

    const [addAdress] = useAddAddressMutation();
    const [updateAddress] = useUpdateAddressMutation();

    const handleOnBlockClick = () => {
        if(props.toggleActive)
            props.toggleActive(true);
    }

    const handleOnFormSubmit = (data:AdressFormsInputs) => {
        if(!props.addressValue){
            addAdress(data).unwrap().then((res) => {
                if(props.toggleActive)
                    props.toggleActive(false);

                router.refresh();
            }).catch((err) => {
                toast.error('Coś poszło nie tak! Spróbuj ponownie później!');
            });
        }
        else{
            updateAddress({id: props.addressValue.id, ...data}).unwrap().then((res) => {
                if(props.toggleActive)
                    props.toggleActive(false);
                if(props.resetAddress)
                    props.resetAddress();

                router.refresh();
            }).catch((err) => {
                toast.error('Coś poszło nie tak! Spróbuj ponownie później!');
            });
        }

    }

    const handleOnCancelClick = () => {
        if(props.toggleActive)
            props.toggleActive(false);
    }

    return(
        <>
            {props.display === "block" ?
            <div className="w-full p-10 bg-gray-100 rounded border transition cursor-pointer hover:bg-blue-200" onClick={handleOnBlockClick}>
                <div className="flex justify-center items-center gap-2">
                    <span className="text-xl"><BiPlusCircle/></span>
                    <span className="text-md">Dodaj nowy adres</span>
                </div>
            </div> : null}

            {props.display === "form" ?
            <form className="w-full mb-10" onSubmit={handleSubmit(handleOnFormSubmit)} onReset={handleOnCancelClick}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    <div className="mb-1">
                        <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900 ">Ulica:</label>
                        <input type="text" {...register('street')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:outline-blue-600" required />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 ">Kod pocztowy:</label>
                        <input type="text" {...register('code')}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:outline-blue-600" required />

                    </div>
                    <div className="mb-1">
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 ">Miasto:</label>
                        <input type="text" {...register('city')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:outline-blue-600" required />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="col-start-1 md:col-start-2">
                        <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 text-sm relative md:mr-14 w-full" type="reset">Anuluj</button>
                    </div>
                    <div className="col-start-1 md:col-start-3">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 text-sm relative md:mr-14 w-full" type="submit">{props.addressValue ? 'Zapisz adres' : 'Dodaj adres'}</button>
                    </div>
                </div>
            </form> : null}
        </>
    )
}

export default AddAddress;