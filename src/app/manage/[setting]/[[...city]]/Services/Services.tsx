import { GetCaregiversList } from "@/controllers/Manage";
import { TCaregiverProfile } from "@/types/User";
import { GetAllCities, GetCity } from "@/controllers/City";
import { TCity } from "@/models/City";
import { TService } from "@/models/Service";
import { GetAllCityServices } from "@/controllers/Services";
import { FaPlus } from "react-icons/fa";
import { ServicesSettings } from "./ServicesSettings/ChangeSettings";

type CitiesProps = {
    cityID: string;
}

const Services = async (props: CitiesProps) => {
    let city:TCity | null = await GetCity(props.cityID)
    let possibleServices:TService[] = await GetAllCityServices(props.cityID);

    return (
        <>
            <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold mb-5">Usługi dla miasta {city?.name}</h2>
            <ServicesSettings service={null} cityID={city?._id} label={<><FaPlus className="mr-2"/>Dodaj usługę</>}/>
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

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {possibleServices.map((service, index) => {
                        return (
                            <tr className="odd:bg-white even:bg-gray-50" key={service._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {index + 1}.
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap w-full">
                                    {service.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex">
                                    <ServicesSettings service={service} cityID={city?._id}/>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Services