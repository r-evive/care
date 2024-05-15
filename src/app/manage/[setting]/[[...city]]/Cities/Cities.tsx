import { GetCaregiversList } from "@/controllers/Manage";
import { TCaregiverProfile } from "@/types/User";
import { GetAllCities } from "@/controllers/City";
import { TCity } from "@/models/City";
import { TService } from "@/models/Service";
import { GetAllSerivices } from "@/controllers/Services";
import { CitiesSettings } from "./CitiesSettings/ChangeSettings";
import { FaPlus } from "react-icons/fa";
import ServicesButton from "./ServicesButton/ServicesButton";

type CitiesProps = {

}

const Cities = async (props: CitiesProps) => {

    let possibleCities:TCity[] = await GetAllCities();

    return (
        <>
            <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold mb-5">Miasta</h2>
            <CitiesSettings city={null} label={<><FaPlus className="mr-2"/>Dodaj miasto</>}/>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            L.P.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nazwa
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Kraj
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {possibleCities.map((city, index) => {
                        return (
                            <tr className="odd:bg-white even:bg-gray-50" key={city._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {index + 1}.
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap w-full">
                                    {city.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap w-full">
                                    {city.country}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex">
                                    <CitiesSettings city={city}/>
                                    {city._id && <ServicesButton cityID={city._id}/>}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Cities