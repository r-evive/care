'use client';

import { Swiper, SwiperSlide } from "swiper/react"
import SingleDate from "./SingleDate/SingleDate"
import moment from "moment"
import { useEffect, useState } from "react";
import { SwiperBreakpoints } from "./SwiperOptions";
import { EffectFade, Navigation } from 'swiper/modules';
import { SlideButton } from "./SlideButton/SlideButton";
import { Swiper as SwiperType } from "swiper/types";
import { IoArrowForward } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { AvailabilityBlock, AvailabilityScope } from "@/types/User";
import { useSetAvailabilityMutation } from "@/store/api/users";


type AvailabilitySwiperProps = {
    availability: AvailabilityScope[];
}

export type possibleStatus = 'unavailable' | 'pending' | 'free' |'booked';

export type updateDateAvabilityProps = {
    dayID: string, blockID: string, status: possibleStatus
}

export const AvailabilitySwiper = ({availability}: AvailabilitySwiperProps) => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType>();
    const [updatedAvailability, setUpdatedAvailability] = useState<AvailabilityScope[]>([]);
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    const [saveAvailability] = useSetAvailabilityMutation();

    const handleSlideChange = (swiper: SwiperType) => {
        setBeginningEnd(swiper);
    }

    const setBeginningEnd = (swiper: SwiperType) => {
        setIsBeginning(!!swiper?.isBeginning);
        setIsEnd(!!swiper?.isEnd);
    }

    const updateDateAvailability = (params: updateDateAvabilityProps) => {
        let newAvailability:AvailabilityScope[] = [...updatedAvailability];

        let selectedDay:AvailabilityScope | undefined = availability.find(x => x.id === params.dayID)

        if(!selectedDay) return;

        //Find block in selected day
        let updatedBlock = selectedDay?.blocks.find(x => x.id === params.blockID);

        if(updatedBlock)
            updatedBlock.status = params.status;
        else
            return;

        //Update new availability
        let index = newAvailability.findIndex(x => x.id === params.dayID);

        if(index !== -1)
        {
            let dayBlocks:AvailabilityBlock[] = newAvailability[index].blocks;
            let blockInNewAvailabilityIndex = dayBlocks.findIndex(x => x.id === params.blockID);

            if(blockInNewAvailabilityIndex !== -1)
                dayBlocks[blockInNewAvailabilityIndex] = updatedBlock;
            else
                dayBlocks.push(updatedBlock);
        }
        else{
            selectedDay = {
                ...selectedDay,
                blocks: [updatedBlock]
            }
            newAvailability.push(selectedDay);
        }

        setUpdatedAvailability(newAvailability);

        console.log(newAvailability);
    }

    const saveNewAvailability = async () => {
        saveAvailability(updatedAvailability).unwrap().then((res) => {
            if(res.status === 200){
                console.log('Availability updated');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="div">
            <div className="flex">
                <SlideButton type='left' swiper={swiperInstance} isBeginning={isBeginning} isEnd={false}/>
                <Swiper breakpoints={ SwiperBreakpoints}  onSwiper={(swiper) => setSwiperInstance(swiper)}
                onInit={setBeginningEnd}
                onSlideChange={handleSlideChange}>
                    {availability?.map((day, index) => (
                        <SwiperSlide key={index}>
                            <SingleDate date={day.date} key={day.id} dayID={day.id} blocks={day.blocks} updateDateAvailability={updateDateAvailability}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <SlideButton type='right' swiper={swiperInstance} isBeginning={false} isEnd={isEnd}/>
            </div>
            {updatedAvailability.length > 0 && <div className="flex justify-center mt-3">
                <button className="flex items-center justify-center bg-blue-950 text-white rounded-lg p-2 px-4 hover:bg-blue-900 transition" onClick={saveNewAvailability}>
                    <IoArrowForward className="text-xl"/>
                    <span className="ml-2">Zapisz</span>
                    </button></div>
                }
        </div>
    )
}