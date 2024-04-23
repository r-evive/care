import { CreateReservation } from "@/controllers/Reservation";
import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import { TReservationCreate } from "@/types/Reservation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    await connectDatabase();

    const userSession = await getServerSession(authOptions);

    try {
        const requestBody: TReservationCreate = await request.json();

        if (!userSession?.user?._id){
            return NextResponse.json({
                success: false,
                message: 'Invalid user'
            }, { status: 400 })
        }

        const reservationSchema = z.object({
            caregiverID: z.string().min(1),
            clientID: z.string().min(1),
            serviceID: z.string().min(1),
            startTime: z.date(),
            endTime: z.date(),
            personID: z.number(),
            addressID: z.number(),
        });

        const reservationData = reservationSchema.parse({
            caregiverID: requestBody.caregiverID,
            clientID: requestBody.clientID,
            serviceID: requestBody.serviceID,
            startTime: new Date(requestBody.startTime),
            endTime: new Date(requestBody.endTime),
            personID: requestBody.personID,
            addressID: requestBody.addressID
        });

        await CreateReservation(reservationData);

        return NextResponse.json({ status: 200 })
    }
    catch (error) {

        return NextResponse.json({
            success: false,
            message: 'Something went wrong: ' + error
        }, { status: 400 });
    }
}