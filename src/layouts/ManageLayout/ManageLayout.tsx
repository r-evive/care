
import { GetProfileMenu } from '@/controllers/ProfileMenu'
import { authOptions } from '@/lib/auth'
import { TProfileMenu } from '@/models/ProfileMenu'
import { getServerSession } from 'next-auth'
import React from 'react'
import ManageMenuItem from './ManageMenuItem/ManageMenuItem'
import { PropsWithChildren } from 'react';
import { GetManageMenu } from '@/controllers/ManageMenu'
import { TManageMenu } from '@/models/ManageMenu'

type Props = {
    path: string;
}

const ManageLayout = async ({ path, children }: PropsWithChildren<Props>) => {
    let session = await getServerSession(authOptions);
    let menu:TManageMenu[] = await GetManageMenu();

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 lg:grid-cols-12 gap-6 px-4">
                <div className="col-span-4 lg:col-span-3">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex flex-col">
                            {menu.map((item: TManageMenu, index:number) => {
                                return (
                                    <ManageMenuItem item={item} index={index} path={path} key={index} />
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

export default ManageLayout