import { FormEvent, useState } from "react";
import { useSwiper } from "swiper/react";
import { Swiper } from "swiper/types";

type SlideButtonProps = {
    type: 'left' | 'right';
    swiper: Swiper | undefined;
    isBeginning: boolean;
    isEnd: boolean;
}

export const SlideButton = (props: SlideButtonProps) => {
    const handleOnClick = (event: FormEvent) => {
        event.preventDefault();

        if (!props.swiper) return;

        if (props.type === 'left') props.swiper.slidePrev();
        else props.swiper.slideNext();
    }

    return (
        <div className='flex items-center justify-center'>
            {
                (props.type === 'left' && !props.isBeginning) || (props.type === 'right' && !props.isEnd )?
                    <button className='p-2 rounded-lg' onClick={handleOnClick}>
                        {props.type === 'left' ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            : null}

                        {props.type === 'right' ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg> : null}

                    </button> : <div className="slideButtonWidth"></div>
            }
        </div>
    )
}