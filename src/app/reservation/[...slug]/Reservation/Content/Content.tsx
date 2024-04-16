import AddressesForm from "@/app/profile/[setting]/Adressses/AddressesForm/AdressesForm";
import PeopleForm from "@/app/profile/[setting]/People/PeopleForm/PeopleForm";
import { getUserAdresses, getUserPeople } from "@/controllers/User";
import { UserAddress, UserPerson } from "@/types/User";
import ReservationButton from "./ReservationButton/ReservationButton";


export const Content = async () => {
    let userAdresses: UserAddress[] = await getUserAdresses();
    let people: UserPerson[] = await getUserPeople();

    return (
        <>
            <div className="bg-white shadow rounded-lg p-6 mb-5">
                <h2 className="text-xl font-bold mb-5">1. Wybierz adres:</h2>
                <hr className="mb-5"/>
                <AddressesForm adresses={userAdresses} source="reservation"/>
            </div>
            <div className="bg-white shadow rounded-lg p-6 m-b-5">
                <h2 className="text-xl font-bold mb-5">2. Wybierz osobę:</h2>
                <hr className="mb-5"/>
                <PeopleForm people={people} source="reservation"/>
            </div>
            <ReservationButton/>
        </>
    )
}