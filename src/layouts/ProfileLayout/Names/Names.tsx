"use client";

import { useSession } from "next-auth/react";


type NamesProps = {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
}

const Names = ({firstName, lastName, email} : NamesProps) => {
    const { data: session } = useSession();

    return (
    <>
        <h1 className="text-xl font-bold">{session?.user?.firstName ?? firstName} {session?.user?.lastName ?? lastName}</h1>
        <p className="text-gray-700">{session?.user?.email ?? email}</p>
    </>
    )
}

export default Names;