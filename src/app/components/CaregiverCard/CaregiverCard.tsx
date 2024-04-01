import { BsThreeDotsVertical } from "react-icons/bs";
import { DateSwiper } from "./DateSwiper/DateSwiper";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { TServiceUser } from "@/types/Service";

type Props = {
    caregiver: TServiceUser;
}

const CaregiverCard = (props: Props) => {
    return (
        <div className="max-full p-6 mt-8 bg-white border border-gray-200 rounded-lg shadow flex md:flex-row flex-col">
            <div className="md:basis-2/5 basis-1 md:pr-8">
                <div className="flex flex-nowrap">
                    <div>
                        <img src="https://avatar.iran.liara.run/public/boy" alt="Placeholder" className="w-20 h-20 object-contain rounded-full border-2 border-gray-300 mr-4" />
                    </div>
                    <div className="w-full flex-1">
                        <h2 className="text-xl font-bold pb-1 mt-1">{props.caregiver.firstName} {props.caregiver.lastName}</h2>
                        <h5 className="text-md font-light">Opiekun osób starszych</h5>
                    </div>
                    <div className="flex self-start">
                        <p className="mt-5"><BsThreeDotsVertical /></p>
                    </div>
                </div>
                <div className="flex mt-5">
                    <div>
                        <i><p className="lg:line-clamp-4 line-clamp-3 text-base text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada leo in augue tempus vulputate. Ut posuere feugiat rhoncus. In augue mi, porttitor ut scelerisque a, accumsan at purus. Pellentesque in magna non nulla dapibus laoreet vel ac lectus. Maecenas quis magna vel lorem hendrerit elementum a ut tellus.</p></i>
                    </div>
                </div>
                <div className="flex mt-5">
                    <div>
                        <h5 className="text-md font-light flex text-yellow-500"><FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf /></h5>
                    </div>
                </div>
            </div>
            <div className="md:basis-3/5 basis-0 md:border-l border-l-solid px-2 border-gray-300 md:overflow-hidden md:mt-0 mt-10">
                <DateSwiper availability={props.caregiver.availability}/>
            </div>

        </div>
    )
}

export default CaregiverCard