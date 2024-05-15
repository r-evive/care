import { GetCaregiversList } from "@/controllers/Manage";
import { TCaregiverProfile } from "@/types/User";
import { ChangeSettings } from "./ChangeSettings/ChangeSettings";
import { GetAllCities } from "@/controllers/City";
import { TCity } from "@/models/City";
import { TService } from "@/models/Service";
import { GetAllSerivices } from "@/controllers/Services";

type CaregiversListProps = {

}

const CaregiversList = async (props: CaregiversListProps) => {

    const caregiversList:TCaregiverProfile[] = await GetCaregiversList();
    let possibleCities:TCity[] = await GetAllCities();
    let possibleServices:TService[] = await GetAllSerivices();

    return (
        <>
            <h2 className="text-xl font-bold mb-5">Opiekunowie</h2>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            L.P.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Imię
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nazwisko
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Miasto
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Usługa
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {caregiversList.map((user, index) => {
                        return (
                            <tr className="odd:bg-white even:bg-gray-50" key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {index + 1}.
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.firstName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.lastName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {possibleCities.find(city => city._id === user.city)?.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {possibleServices.find(service => service._id === user.service)?.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <ChangeSettings
                                    caregiver={user}
                                    cities={possibleCities}
                                    selectedCity={{value: user.city, label: possibleCities.find(city => city._id === user.city)?.name || '', isDisabled: false}}
                                    selectedService={{value: user.service, label: possibleServices.find(service => service._id === user.service)?.name || '', isDisabled: false}}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default CaregiversList