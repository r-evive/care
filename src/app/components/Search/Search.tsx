"use client";

import React from 'react'
import { BsGeoAlt, BsCalendar4Week, BsClipboardHeart, BsSearchHeart } from 'react-icons/bs'

type Props = {}

const Search = (props: Props) => {
  return (
    <div className="bg-white md:rounded-full p-8 shadow-lg max-w-7xl w-full mx-auto mt-20 rounded-2xl z-50">
        <div className="grid md:grid-cols-4 lg:gap-3 xs:grid-cols-1 gap-8">
            <div className="flex justify-start items-center gap-4">
                <div className="flex icon">
                    <BsGeoAlt className="w-8 h-8 text-gray-400" />
                </div>
                <div className="text">
                    <label htmlFor="location" className="block text-md font-medium text-gray-700">Lokalizacja</label>
                    <div className="mt-1">
                        <input type="text" name="location" id="location" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-md border-gray-300 rounded-md" placeholder="Wybierz miasto" />
                    </div>
                </div>
            </div>

            <div className="flex justify-start items-center gap-4">
                <div className="flex icon">
                    <BsClipboardHeart className="w-8 h-8 text-gray-400" />
                </div>
                <div className="text">
                    <label htmlFor="location" className="block text-md font-medium text-gray-700">Usługa</label>
                    <div className="mt-1">
                        <input type="text" name="location" id="location" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-md border-gray-300 rounded-md" placeholder="Wybierz usługę" />
                    </div>
                </div>
            </div>

            <div className="flex justify-start items-center gap-4">
                <div className="flex icon">
                    <BsCalendar4Week className="w-8 h-8 text-gray-400" />
                </div>
                <div className="text">
                    <label htmlFor="duration" className="block text-md font-medium text-gray-700">Termin</label>
                    <div className="mt-1">
                        <input type="text" name="duration" id="duration" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-md border-gray-300 rounded-md" placeholder="Wybierz termin" />
                    </div>
                </div>
            </div>
            
            <div className="flex justify-start items-center gap-4 w-100">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full flex justify-center items-center gap-2 text-lg relative py-3">
                    <BsSearchHeart className="text-white" />
                    Szukaj
                </button>
            </div>
        </div>


    </div>
  )
}

export default Search