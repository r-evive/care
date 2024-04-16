"use client"

const ReservationButton = () => {
    return (
        <div className="flex justify-end mt-5 mb-5">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center inline-flex items-center">
                Utwórz rezerwację
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
        </div>
    )
}

export default ReservationButton