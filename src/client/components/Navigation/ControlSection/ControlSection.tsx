import { useGetRoleLabel } from "@/client/hooks/useGetRoleLabel";
import { useOutsideClick } from "@/client/hooks/useOutsideClick";
import { signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { BsDoorOpen, BsGear } from "react-icons/bs"


const ControlSection = () => {
    const dropDownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropDownOutsideClick = useOutsideClick(dropDownRef, () => setIsDropdownOpen(false));
    const session = useSession();
    const roleLabel = useGetRoleLabel(session?.data?.user?.role);

    const handleDropDownClick = () => {
        setIsDropdownOpen((prevState) => !prevState);
    }

    const getUserFullName = () => {
        if (session?.data?.user?.firstName && session?.data?.user?.lastName) {
            return `${session?.data?.user?.firstName} ${session?.data?.user?.lastName}`
        }
        return 'Użytkownik';
    }

    const handleLogout = async () => {
        await signOut();
    }

    return (
        <div className="relative flex items-center md:order-2 xs:mt-5">
            <div className="relative" ref={dropDownRef}>
                <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0" onClick={handleDropDownClick}>
                    <img className="w-8 h-8 rounded-full" src="https://www.w3schools.com/howto/img_avatar.png" />
                </button>

                <div className={`absolute right-0 top-11 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100  min-w-[150px] max-w-[300px] rounded-lg shadow ${isDropdownOpen ? 'block' : 'hidden'}`}>
                    <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 ">{getUserFullName()}</span>
                        <span className="block text-sm  text-gray-500 truncate">{roleLabel}</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                        <li onClick={handleLogout}>
                            <a className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer hover:text-blue-500 whitespace-nowrap items-center gap-2"><BsGear /> Ustawienia</a>
                        </li>
                        <li onClick={handleLogout}>
                            <a className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer hover:text-blue-500 whitespace-nowrap items-center gap-2"><BsDoorOpen /> Wyloguj</a>
                        </li>
                    </ul>
                </div>
            </div>
            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-user" aria-expanded="false">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
        </div>
    )
}

export default ControlSection