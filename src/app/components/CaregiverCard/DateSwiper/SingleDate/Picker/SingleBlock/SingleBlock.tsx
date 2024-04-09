import Availability from "@/app/profile/[setting]/Availability/Availability";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AvailabilityBlock, AvailabilityScope } from "@/types/User";
import moment from "moment";
import { use, useContext, useState } from "react";
import { SwiperContext, TSwiperSelected } from "../../../SwiperContext/SwiperContext";
import { setReservationBlocks } from "@/store/slices/reservationSlice";

type SingleBlockProps = {
    block: AvailabilityBlock;
}

export const SingleBlock = (props:SingleBlockProps) => {
    const [hover, setHover] = useState<boolean>(false);
    const {selectedBlocks, setSelectedBlocks} = useContext(SwiperContext);

    const dispatch = useAppDispatch();

    const handleBlockClick = () => {
        if((selectedBlocks.firstBlock && selectedBlocks.firstBlock) &&
            (!moment(selectedBlocks.firstBlock.startTime).isSame(props.block.startTime, 'day') || !moment(selectedBlocks.firstBlock.endTime).isSame(props.block.endTime, 'day'))){
                setSelectedBlocks({firstBlock: props.block, lastBlock: undefined, hoverBlock: undefined})
        }

        if(!selectedBlocks.firstBlock){
            setSelectedBlocks({firstBlock: props.block, lastBlock: undefined, hoverBlock: undefined})
        }
        else{
            if(!selectedBlocks.lastBlock){
                if(!moment(props.block.startTime).isSame(selectedBlocks.firstBlock.startTime, 'day'))
                    return;

                setSelectedBlocks({firstBlock: selectedBlocks.firstBlock, lastBlock: props.block, hoverBlock: undefined})

                dispatch(setReservationBlocks(
                    {
                        startBlock: {
                            ...selectedBlocks.firstBlock,
                            startTime: selectedBlocks.firstBlock.startTime.toISOString(),
                            endTime: selectedBlocks.firstBlock.endTime.toISOString()
                        },
                        endBlock: {
                            ...props.block,
                            startTime: props.block.startTime.toISOString(),
                            endTime: props.block.endTime.toISOString()
                        }
                    }
                ))
            }
            else{
                setSelectedBlocks({ firstBlock: props.block, lastBlock: undefined, hoverBlock: undefined})
            }
        }

    }

    const isSelected = () => {
        if(selectedBlocks.firstBlock && selectedBlocks.firstBlock.id === props.block.id)
            return true;
        if(selectedBlocks.lastBlock && selectedBlocks.lastBlock.id === props.block.id)
            return true;

        if(selectedBlocks.firstBlock && selectedBlocks.lastBlock){
            if(moment(props.block.startTime).isBetween(selectedBlocks.firstBlock.startTime, selectedBlocks.lastBlock.startTime) || moment(props.block.startTime).isBetween(selectedBlocks.lastBlock.startTime, selectedBlocks.firstBlock.startTime))
                return true;
        }

        return false;
    }


    return (
        <div className={`flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg mb-2 px-8 text-sm whitespace-nowrap cursor-pointer transition ${isSelected() ? 'bg-blue-500 text-white': ''} `} onClick={handleBlockClick}>
            {moment(props.block.startTime).format('HH:mm')} - {moment(props.block.endTime).format('HH:mm')}
        </div>
    )
}
