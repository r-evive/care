import { ChangeReservationStatus, CreateReservation } from "@/controllers/Reservation";
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
        const requestBody: {reservationID: string; status: string} = await request.json();

        if (!userSession?.user?._id){
            return NextResponse.json({
                success: false,
                message: 'Invalid user'
            }, { status: 400 })
        }

        const reservationSchema = z.object({
            reservationID: z.string().min(1),
            status: z.string().min(1),
        });

        const reservationData = reservationSchema.parse({
            reservationID: requestBody.reservationID,
            status: requestBody.status
        });

        await ChangeReservationStatus(reservationData);

        return NextResponse.json({ status: 200 })
    }
    catch (error) {

        return NextResponse.json({
            success: false,
            message: 'Something went wrong: ' + error
        }, { status: 400 });
    }
}