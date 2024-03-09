'use server';

import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import Users from "@/models/Users";
import { UserAddress, UserPerson } from "@/types/User";
import { getServerSession } from "next-auth";
import { getCsrfToken, getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function getUserAdresses():Promise<UserAddress[]>{
    await connectDatabase();
    const session = await getServerSession(authOptions);

    if(!session?.user?._id) return [];

    let user = await Users.findOne({ _id: session.user._id }, { addresses: 1 });

    if(!user) return [];

    return user.addresses;
}

export async function getUserPeople():Promise<UserPerson[]>{
    await connectDatabase();
    const session = await getServerSession(authOptions);

    if(!session?.user?._id) return [];

    let user = await Users.findOne({ _id: session.user._id }, { people: 1 });

    if(!user) return [];

    return user.people;
}