import { useRouter } from "next/navigation"
import { BsLockFill } from "react-icons/bs"

const LoginSection = () => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/login');
    }

    return (
        <div className="relative flex items-center md:order-2 xs:mt-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full flex justify-center items-center gap-2 text-sm relative" onClick={handleButtonClick}>
                Zaloguj się
            </button>
        </div>
    )
}

export default LoginSection