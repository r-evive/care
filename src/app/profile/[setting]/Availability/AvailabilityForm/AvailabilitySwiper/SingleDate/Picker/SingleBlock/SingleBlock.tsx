import moment from "moment";
import { possibleStatus, updateDateAvabilityProps } from "../../../AvailabilitySwiper";
import { useState } from "react";
import { AvailabilityBlock } from "@/types/User";

type SingleBlockProps = {
    block: AvailabilityBlock;
    dayID: string;
    updateDateAvailability: (params: updateDateAvabilityProps) => void;
}


const blockStates:possibleStatus[]= ['unavailable', 'pending', 'free', 'booked'];

const statusMap = {
    'unavailable': {
        text: 'Niedostępny',
        bg: 'bg-gray-100',
        color: ''
    },
    'pending': {
        text: 'Nieprzypisany',
        bg: '',
        color: ''
    },
    'free': {
        text: 'Wolny',
        bg: 'bg-green-400',
        color: ''
    },
    'booked': {
        text: 'Zarezerwowany',
        bg: 'bg-red-400',
        color: 'text-red-900'
    }
}

export const SingleBlock = (props:SingleBlockProps) => {
    let [status, setStatus] = useState<possibleStatus>(props.block.status);
    let [statusDetails, setStatusDetails] = useState(statusMap[status] ?? {text: '---', color: 'text-gray-600'});

    const onClick = () => {
        if(status === 'booked' || status == 'unavailable') return;
        let newStatus:possibleStatus = increaseBlockStatus();
        props.updateDateAvailability({dayID: props.dayID, blockID: props.block.id, status: newStatus})
    }

    const increaseBlockStatus = ():possibleStatus => {
        let index = blockStates.indexOf(status);

        if(index < blockStates.length - 2){
            let newState = blockStates[index + 1];
            setStatus(newState);
            setStatusDetails(statusMap[newState]);
            return newState
        }

        setStatus('pending');
        setStatusDetails(statusMap['pending']);
        return 'pending';
    }

    return (
        <div className={`flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg mb-3 px-8 text-sm whitespace-nowrap cursor-pointer hover:bg-blue-100 transition ${statusDetails.bg}`} onClick={onClick}>
            <span className={`mb-1 ${statusDetails.color}`}>{moment(props.block.startTime).format('HH:mm')} - {moment(props.block.startTime).add(props.block.duration, 'minutes').format('HH:mm')}</span>
            <span className={`font-extralight text-gray-600 text-xs ${statusDetails.color}`}>{statusDetails.text}</span>
        </div>
    )
}
