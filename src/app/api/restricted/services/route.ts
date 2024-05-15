import { AddService, EditService } from "@/controllers/Services";
import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import { TCityManage, TServiceManage } from "@/types/Service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    await connectDatabase();

    const userSession = await getServerSession(authOptions);

    try {
        const requestBody: TServiceManage = await request.json();

        if (!userSession?.user?._id){
            return NextResponse.json({
                success: false,
                message: 'Invalid user'
            }, { status: 400 })
        }

        const serviceSchema = z.object({
            name: z.string().min(1).max(255),
            editing: z.boolean()
        });

        const serviceData = serviceSchema.parse({
            name: requestBody.name,
            editing: requestBody.editing
        });

        if(serviceData.editing){
            if(!requestBody._id){
                return NextResponse.json({
                    success: false,
                    message: 'Invalid city ID'
                }, { status: 400 })
            }

            let result = await EditService(requestBody._id, serviceData.name);

            if(!result){
                return NextResponse.json({
                    success: false,
                    message: 'City not found'
                }, { status: 400 })
            }
        }
        else{
            if(!requestBody.city)
                return NextResponse.json({
                    success: false,
                    message: 'Invalid city ID'
                }, { status: 400 })

            await AddService(serviceData.name, requestBody.city);
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