import moment from "moment"
import { SingleBlock } from "./SingleBlock/SingleBlock"
import { AvailabilityBlock } from "@/types/User";
import { DEFAULT_VISIBLE_BLOCKS } from "../../SwiperOptions";
import { TSwiperSelected } from "../../SwiperContext/SwiperContext";


type PickerProps = {
    blocks: AvailabilityBlock[];
    showAll: boolean;
}

export const Picker = (props:PickerProps) => {

    return (
        <div className='flex flex-col items-center justify-center p-2'>
            {props.blocks.map((block, index) => {
                if(index < DEFAULT_VISIBLE_BLOCKS || props.showAll)
                    return <SingleBlock key={index} block={block}/>
                return null;
            })}
        </div>
    )
}
