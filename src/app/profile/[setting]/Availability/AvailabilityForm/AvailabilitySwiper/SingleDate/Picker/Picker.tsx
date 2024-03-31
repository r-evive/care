import moment from "moment"
import { SingleBlock } from "./SingleBlock/SingleBlock"
import { AvailabilityBlock } from "@/types/User"
import { updateDateAvabilityProps } from "../../AvailabilitySwiper";


type PickerProps = {
    blocks: AvailabilityBlock[];
    updateDateAvailability: (params: updateDateAvabilityProps) => void;
    dayID: string;
}

export const Picker = (props: PickerProps) => {
    return (
        <div className='flex flex-col items-center justify-center p-2'>
            {props?.blocks?.map(block => (
                <SingleBlock key={block.id} dayID={props.dayID} block={block} updateDateAvailability={props.updateDateAvailability} />
            ))}
        </div>
    )
}
