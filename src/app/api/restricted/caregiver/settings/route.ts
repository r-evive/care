import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import Users from "@/models/Users";
import { CaregiverSettingsPayload } from "@/store/api/users";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(request: NextRequest) {
    await connectDatabase();
    const session = await getServerSession(authOptions);

    try {
        const body: CaregiverSettingsPayload = await request.json();

        if (!session?.user?._id){
            return NextResponse.json({
                success: false,
                message: 'Invalid user'
            }, { status: 400 })
        }

        const settingsSchema = z.object({
            city: z.string().min(1, { message: 'Miasto jest wymagane' }),
            service: z.string().min(1, { message: 'Usługa jest wymagana' }),
        })

        const data = settingsSchema.parse({
            city: body.city,
            service: body.service,
        })

        let update = await Users.findOneAndUpdate({ _id: session.user._id }, {
            city: body.city,
            service: body.service,
        });

        return NextResponse.json({
            success: true,
            message: 'Zaktualizowano ustawienia opiekuna'
        }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({
            message: 'Coś poszło nie tak! Spróbuj ponownie później!',
        }, { status: 400 })
    }
}