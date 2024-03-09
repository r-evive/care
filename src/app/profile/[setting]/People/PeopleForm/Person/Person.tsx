import { useDeletePersonMutation } from "@/store/api/users";
import { UserPerson } from "@/types/User";
import moment from "moment";
import { useRouter } from "next/navigation";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

type PersonProps = {
    person: UserPerson,
    index: number,
    toggleEdit?: (address:UserPerson) => void;
}
const Person = ({person, index, toggleEdit}: PersonProps) => {
    let router = useRouter();
    const [deletePerson] = useDeletePersonMutation();

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

    return (
    <div className="w-full bg-blue-100 rounded border transition cursor-pointer hover:bg-blue-200 block p-3 group">
        <span className="w-full font-bold mb-2 flex justify-between">
            <span>Osoba {index}:</span>
            <span className="gap-3 hidden group-hover:flex text-gray-800"><BsTrashFill onClick={handleDelete}/> <BsPencilFill onClick={handleEdit}/></span>
        </span>
        <span className="w-full block">{person?.firstName} {person?.lastName}</span>
        <span className="w-full block">{person?.birthDate ? `ur. ${moment(person.birthDate).format('DD/MM/YYYY')}` : ''}</span>
    </div>)
}

export default Person;