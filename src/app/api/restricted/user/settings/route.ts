import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import Users from "@/models/Users";
import { UserSettingsUpdatePayload } from "@/store/api/users";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(request: NextRequest) {
    await connectDatabase();
    const session = await getServerSession(authOptions);

    try {
        const body: UserSettingsUpdatePayload = await request.json();

        if (!session?.user?._id){
            return NextResponse.json({
                success: false,
                message: 'Invalid user'
            }, { status: 400 })
        }

        const settingsSchema = z.object({
            firstName: z.string().min(1, { message: 'Imię jest wymagane' }),
            lastName: z.string().min(1, { message: 'Nazwisko jest wymagane' }),
        })

        const data = settingsSchema.parse({
            firstName: body.firstName,
            lastName: body.lastName,
        })

        let update = await Users.findOneAndUpdate({ _id: session.user._id }, {
            firstName: data.firstName,
            lastName: data.lastName
        });

        return NextResponse.json({
            firstName: data.firstName,
            lastName: data.lastName
        }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({
            message: 'Coś poszło nie tak! Spróbuj ponownie później!',
        }, { status: 400 })
    }
}