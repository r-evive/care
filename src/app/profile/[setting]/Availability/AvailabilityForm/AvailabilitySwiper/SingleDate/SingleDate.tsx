"use client";

import moment from 'moment';
import { useState } from 'react';
import { Picker } from './Picker/Picker';
import { AvailabilityBlock, AvailabilityScope } from '@/types/User';
import { updateDateAvabilityProps } from '../AvailabilitySwiper';

type SingleDateProps = {
    date: Date;
    blocks: AvailabilityBlock[];
    dayID: string;
    updateDateAvailability: (params: updateDateAvabilityProps) => void;
}

const SingleDate = (props: SingleDateProps) => {
    const [date, setDate] = useState<moment.Moment | null>(props.date ? moment(props.date) : null);

    const getDateDay = () => {
        let days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
        let currentDate = moment();
        
        if(currentDate.isSame(date, 'day'))
            return 'Dzisiaj';
        else if(currentDate.add(1, 'day').isSame(date, 'day'))
            return 'Jutro';
        else
            return date? days[date?.day() ?? 0] : '';
    }

    return (
        <div className="flex flex-col">
            <h4 className="text-center font-bold text-blue-950">
                {getDateDay()}
            </h4>
            <h4 className="text-center mb-3 text-sm">
                {date?.format('DD.MM')}
            </h4>
            <div className='flex flex-col items-center justify-center'>
                <Picker blocks={props.blocks} updateDateAvailability={props.updateDateAvailability} dayID={props.dayID}/>
            </div>
        </div>
    )
}

export default SingleDate;