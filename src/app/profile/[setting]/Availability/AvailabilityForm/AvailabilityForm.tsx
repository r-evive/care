import { getAvailability } from "@/controllers/User";
import { AvailabilitySwiper } from "./AvailabilitySwiper/AvailabilitySwiper";
import { AvailabilityScope } from "@/types/User";


const AvailabilityForm = async () => {
    let userAvailability:AvailabilityScope[] = await getAvailability();

    return <>
        <AvailabilitySwiper availability={userAvailability}/>
    </>
}


export default AvailabilityForm;