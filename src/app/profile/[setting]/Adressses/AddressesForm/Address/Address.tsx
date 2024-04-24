import { useDeleteAddressMutation } from "@/store/api/users";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAddress } from "@/store/slices/reservationSlice";
import { UserAddress } from "@/types/User";
import { useRouter } from "next/navigation";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

type AddressProps = {
    address: UserAddress,
    index: number,
    toggleEdit?: (address:UserAddress) => void;
    source?: 'reservation' | 'profile';
}
const Address = ({address, index, toggleEdit, source}: AddressProps) => {
    let router = useRouter();
    const [deleteAddress] = useDeleteAddressMutation();
    const selectedAddress = useAppSelector(state => state?.reservation?.addressId);
    const dispatch = useAppDispatch();


    const handleDelete = () => {
        if(!address.id) return;
        deleteAddress(address.id.toString()).unwrap().then((res) => {
            router.refresh();
        }).catch((err) => {
            toast.error('Wystąpił błąd podczas usuwania adresu! Spróbuj ponownie później!');
        });;
    }

    const handleEdit = () => {
        if(address)
            if(toggleEdit)
                toggleEdit(address);
    }

    const handleOnClick = () => {
        if(source == 'reservation') {
            if(selectedAddress == address.id)
                dispatch(setAddress(undefined));
            else
                dispatch(setAddress(address.id?.toString()));
        }
    }

    const isSelected = () => {
        if(source != 'reservation') return false;

        if(selectedAddress == address.id) return true;
    }

    return (
    <div className={`w-full bg-blue-100 rounded border transition cursor-pointer hover:bg-blue-200 block p-3 group ${isSelected() ? 'outline outline-2 outline-indigo-700':''}`} onClick={handleOnClick}>
        <span className="w-full font-bold mb-2 flex justify-between">
            <span>Adres {index}:</span>

            {source != 'reservation' && <span className="gap-3 hidden group-hover:flex text-gray-800"><BsTrashFill onClick={handleDelete}/> <BsPencilFill onClick={handleEdit}/></span>}
        </span>
        <span className="w-full block">{address.street}</span>
        <span className="w-full block">{address.code} {address.city}</span>
    </div>)
}

export default Address;