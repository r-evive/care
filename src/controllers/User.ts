'use server';

import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import Users from "@/models/Users";
import { getServerSession } from "next-auth";
import { getCsrfToken, getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function updateUserSettings(previousState: any,formData: FormData,){
    await connectDatabase();
    const session = await getServerSession(authOptions)

    if(!session?.user?._id) return;

    const settingsSchema = z.object({
        firstName: z.string().min(1, { message: 'Imię jest wymagane' }),
        lastName: z.string().min(1, { message: 'Nazwisko jest wymagane' }),
    })

    try{
        const data = settingsSchema.parse({
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
        })

        let update = await Users.findOneAndUpdate({_id: session.user._id}, {
            firstName: data.firstName,
            lastName: data.lastName
        });

        return {
            success: true,
            message: 'Pomyślnie zaktualizowano ustawienia!',
            firstName: data.firstName,
            lastName: data.lastName
        }

    } 
    catch(err: any){
        return {
            success: false,
            message: err.errors[0].message
        }
    }
}