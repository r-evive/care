
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import { PropsWithChildren } from 'react';



type Props = {
    content: React.ReactNode
    side: React.ReactNode
}

const ReservationLayout = async (props: PropsWithChildren<Props>) => {
    let session = await getServerSession(authOptions);

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 lg:grid-cols-12 gap-6 px-4 order-last lg:order-first">
                <div className="col-span-4 lg:col-span-9 ">
                    {props.content}
                </div>
                <div className="col-span-4 lg:col-span-3 order-first lg:order-last">
                    <div className="bg-white shadow rounded-lg p-6">
                        {props.side}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservationLayout