import { AddCity, EditCity } from "@/controllers/City";
import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import { TCityManage } from "@/types/Service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    await connectDatabase();

    const userSession = await getServerSession(authOptions);

    try {
        const requestBody: TCityManage = await request.json();

        if (!userSession?.user?._id){
            return NextResponse.json({
                success: false,
                message: 'Invalid user'
            }, { status: 400 })
        }

        const reservationSchema = z.object({
            name: z.string().min(1).max(255),
            country: z.string().min(1).max(255),
            editing: z.boolean()
        });

        const cityData = reservationSchema.parse({
            name: requestBody.name,
            country: requestBody.country,
            editing: requestBody.editing
        });

        if(cityData.editing){
            if(!requestBody._id){
                return NextResponse.json({
                    success: false,
                    message: 'Invalid city ID'
                }, { status: 400 })
            }

            let result = await EditCity(requestBody._id, cityData.name, cityData.country);

            if(!result){
                return NextResponse.json({
                    success: false,
                    message: 'City not found'
                }, { status: 400 })
            }
        }
        else{
            await AddCity(cityData.name, cityData.country);
        }

        return NextResponse.json({ status: 200 })
    }
    catch (error) {

        return NextResponse.json({
            success: false,
            message: 'Something went wrong: ' + error
        }, { status: 400 });
    }
}