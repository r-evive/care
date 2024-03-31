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

export const DateSwiper = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType>();
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    const [reservationPossible, setReservationPossible] = useState<boolean>(false);

    const handleSlideChange = (swiper: SwiperType) => {
        setBeginningEnd(swiper);
    }

    const setBeginningEnd = (swiper: SwiperType) => {
        setIsBeginning(!!swiper?.isBeginning);
        setIsEnd(!!swiper?.isEnd);
    }

    return (
        <div className="div">
            <div className="flex">
                <SlideButton type='left' swiper={swiperInstance} isBeginning={isBeginning} isEnd={false}/>
                <Swiper breakpoints={ SwiperBreakpoints}  onSwiper={(swiper) => setSwiperInstance(swiper)}
                onInit={setBeginningEnd}
                onSlideChange={handleSlideChange}>
                    {Array.from({ length: 14 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <SingleDate date={moment().add(index, 'days').format('YYYY MM DD')} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <SlideButton type='right' swiper={swiperInstance} isBeginning={false} isEnd={isEnd}/>
            </div>
            <div className="flex flex-col mt-2">
                <p className="flex items-center text-sm text-center mb-2 text-blue-900 justify-center cursor-pointer">Pokaż więcej <IoIosArrowDown className="ml-2"/></p>
                {reservationPossible ?<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 text-sm relative md:mr-14 w-full">Rezerwuję <IoArrowForward /></button>  :null}
            </div>
        </div>
    )
}