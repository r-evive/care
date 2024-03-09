import { useDeleteAddressMutation } from "@/store/api/users";
import { UserAddress } from "@/types/User";
import { useRouter } from "next/navigation";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

type AddressProps = {
    address: UserAddress,
    index: number,
    toggleEdit?: (address:UserAddress) => void;
}
const Address = ({address, index, toggleEdit}: AddressProps) => {
    let router = useRouter();
    const [deleteAddress] = useDeleteAddressMutation();

    const handleDelete = () => {

        console.log(address);
        if(!address.id) return;
        deleteAddress(address.id).unwrap().then((res) => {
            router.refresh();
        }).catch((err) => {
            toast.error('Wystąpił błąd podczas usuwania adresu! Spróbuj ponownie później!');
        });;
    }

    const handleEdit = () => {
        console.log(address, toggleEdit)
        if(address)
            if(toggleEdit)
                toggleEdit(address);
    }

    return (
    <div className="w-full bg-blue-100 rounded border transition cursor-pointer hover:bg-blue-200 block p-3 group">
        <span className="w-full font-bold mb-2 flex justify-between">
            <span>Adres {index}:</span>
            <span className="gap-3 hidden group-hover:flex text-gray-800"><BsTrashFill onClick={handleDelete}/> <BsPencilFill onClick={handleEdit}/></span>
        </span>
        <span className="w-full block">{address.street}</span>
        <span className="w-full block">{address.code} {address.city}</span>
    </div>)
}

export default Address;