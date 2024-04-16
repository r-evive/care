import { useDeletePersonMutation } from "@/store/api/users";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPerson } from "@/store/slices/reservationSlice";
import { UserPerson } from "@/types/User";
import moment from "moment";
import { useRouter } from "next/navigation";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

type PersonProps = {
    person: UserPerson,
    index: number,
    toggleEdit?: (address:UserPerson) => void;
    source?: 'reservation' | 'profile';
}
const Person = ({person, index, toggleEdit, source}: PersonProps) => {
    let router = useRouter();
    const [deletePerson] = useDeletePersonMutation();
    const selectedPerson = useAppSelector(state => state?.reservation?.personId);
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        if(!person.id) return;
        deletePerson(person.id).unwrap().then((res) => {
            router.refresh();
        }).catch((err) => {
            toast.error('Wystąpił błąd podczas usuwania adresu! Spróbuj ponownie później!');
        });;
    }

    const handleEdit = () => {
        if(person)
            if(toggleEdit)
                toggleEdit(person);
    }

    const handleOnClick = () => {
        if(source == 'reservation') {
            if(selectedPerson == person.id)
                dispatch(setPerson(undefined));
            else
                dispatch(setPerson(person.id));
        }
    }

    const isSelected = () => {
        if(source != 'reservation') return false;

        if(selectedPerson == person.id) return true;
    }
    return (
    <div className={`w-full bg-blue-100 rounded border transition cursor-pointer hover:bg-blue-200 block p-3 group ${isSelected() ? 'outline outline-2 outline-indigo-700':''}`} onClick={handleOnClick}>
        <span className="w-full font-bold mb-2 flex justify-between">
            <span>Osoba {index}:</span>
            {source != 'reservation' && <span className="gap-3 hidden group-hover:flex text-gray-800"><BsTrashFill onClick={handleDelete}/> <BsPencilFill onClick={handleEdit}/></span>}
        </span>
        <span className="w-full block">{person?.firstName} {person?.lastName}</span>
        <span className="w-full block">{person?.birthDate ? `ur. ${moment(person.birthDate).format('DD/MM/YYYY')}` : ''}</span>
    </div>)
}

export default Person;