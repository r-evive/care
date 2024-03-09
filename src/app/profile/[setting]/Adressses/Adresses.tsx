import { getUserAdresses } from "@/controllers/User";
import AddressesForm from "./AddressesForm/AdressesForm";
import { UserAddress } from "@/types/User";

const Adresses = async () => {
    let userAdresses: UserAddress[] = await getUserAdresses();

    return (
        <>
            <h2 className="text-xl font-bold mb-5">Adresy</h2>
            <AddressesForm adresses={userAdresses}/>
        </>
    )

}

export default Adresses;