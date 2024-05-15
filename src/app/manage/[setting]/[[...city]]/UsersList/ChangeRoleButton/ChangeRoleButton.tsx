"use client"

import { useChangeUserRoleMutation } from "@/store/api/users"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type ChangeRoleButtonProps = {
    userId: string;
    role: string;
}

const ChangeRoleButton = (props: ChangeRoleButtonProps) => {
    const [changeUserRole] = useChangeUserRoleMutation()
    const router = useRouter();

    const handleClick = () => {
        changeUserRole({userId: props.userId, role: getNextRole(props.role)}).unwrap().then((res) => {
            toast.success('Rola użytkownika została zmieniona');
            router.refresh();
        }).catch((err) => {
            toast.error('Coś poszło nie tak! Spróbuj ponownie później!');
        });
    }


    const getNextRole = (role: string) => {
        switch(role){
            case 'user':
                return 'admin';
            case 'admin':
                return 'caregiver';
            default:
                return 'user';
        }
    }

    return (
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={handleClick}>Zmień role</button>
    )
}

export default ChangeRoleButton