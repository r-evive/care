"use client";
import { TProfileMenu } from "@/models/ProfileMenu"
import { useRouter } from "next/navigation"


const ProfileMenuItem = ({item, index, path} : {item:TProfileMenu, index: number, path: string}) => {
    const router = useRouter();

    const isMenuItemSelected = (pathname:string) => {
        pathname = pathname.replace('/', '');
        return pathname === path ? 'bg-blue-500 text-white hover:bg-blue-500': '';
    }

    const handleOnClick = () => {
        router.push(`/profile/${item.path}`);
    }

    return (
        <div className={`flex items-center gap-2 py-2 px-2 rounded cursor-pointer transition text-gray-700 hover:bg-blue-100 ${isMenuItemSelected(item.path)}`} key={index} onClick={handleOnClick}>
            <span className="text-lg">{item.icon}</span>
            <span className="text-lg">{item.label}</span>
        </div>
    )
}

export default ProfileMenuItem
