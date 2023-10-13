import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

type Props = {}

const Welcome = (props: Props) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 z-20">
        <div className="w-full px-0 md:pr-10 md:mt-20 mt-5">
            <h1 className="lg:text-6xl text-5xl font-bold text-blue-900 mb-12">
                Opieka, wsparcie i doświadczenie
            </h1>


            <p className="text-gray-400 leading-8 text-xl md:text-lg mb-6">
                Korzystając z naszych usług, otaczasz się profesjonalną opieką i wsparciem. Z nami masz pewność, że Twoi bliscy są w dobrych rękach, niezależnie od sytuacji - od codziennej pomocy, przez opiekę nocną, po specjalistyczne wsparcie.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex justify-center items-center gap-2 text-lg relative mb-8">
                -   Zobacz naszą ofertę   -
            </button>
        </div>
        <div className="w-full relative md:h-[500px] h-[400px]">
            <img src="https://plus.unsplash.com/premium_photo-1681996922112-1dbeb36cd4ec?w=500" className="rounded-lg shadow-lg absolute top-10 md:left-0 left-[-40px] outline outline-offset-[-5px] outline-1 outline-blue-200"/>
            <img src="https://plus.unsplash.com/premium_photo-1661423762612-e8fae810cb4b?w=500" className="rounded-lg shadow-lg absolute md:top-32 xl:right-10 top-32 right-[-40px] outline outline-offset-[-5px] outline-1 outline-blue-200"/>
        </div>
    </div>
  )
}

export default Welcome