
import { GetProfileMenu } from '@/controllers/ProfileMenu'
import { authOptions } from '@/lib/auth'
import { TProfileMenu } from '@/models/ProfileMenu'
import { getServerSession } from 'next-auth'
import React from 'react'
import ProfileMenuItem from './ProfileMenuItem/ProfileMenuItem'
import { PropsWithChildren } from 'react';
import Names from './Names/Names'



type Props = {
    path: string;
}

const ProfileLayout = async ({ path, children }: PropsWithChildren<Props>) => {
    let session = await getServerSession(authOptions);
    let menu = await GetProfileMenu();

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 lg:grid-cols-12 gap-6 px-4">
                <div className="col-span-4 lg:col-span-3">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex flex-col items-center">
                            <img src="https://randomuser.me/api/portraits/men/94.jpg" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">

                            </img>
                            <Names firstName={session?.user?.firstName} lastName={session?.user?.lastName} email={session?.user?.email}/>
                        </div>
                        <hr className="my-6 border-t border-gray-300" />
                        <div className="flex flex-col">
                            {menu.map((item: TProfileMenu, index:number) => {
                                return (
                                    <ProfileMenuItem item={item} index={index} path={path} key={index} />
                                )
                            })}
                        </div>

                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 py-2 px-2">


                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 lg:col-span-9 ">
                    <div className="bg-white shadow rounded-lg p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>

    )

}

export default ProfileLayout