"use client";
import { TProfileMenu } from "@/models/ProfileMenu"
import { useRouter } from "next/navigation"
import Link from 'next/link'


const ProfileMenuItem = ({item, index, path} : {item:TProfileMenu, index: number, path: string}) => {
    const router = useRouter();

    const isMenuItemSelected = (pathname:string) => {
        pathname = pathname.replace('/', '');
        return pathname === path ? 'bg-blue-500 text-white hover:bg-blue-500': '';
    }

    return (
        <Link href={`/profile/${item.path}`}>
            <div className={`flex items-center gap-2 py-2 px-2 rounded cursor-pointer transition text-gray-700 hover:bg-blue-100 ${isMenuItemSelected(item.path)}`} key={index}>
                <span className="text-lg">{item.icon}</span>
                <span className="text-lg">{item.label}</span>
            </div>
        </Link>
    )
}

export default ProfileMenuItem
