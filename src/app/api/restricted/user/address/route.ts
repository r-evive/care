import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import Users from "@/models/Users";
import { UserSettingsUpdatePayload } from "@/store/api/users";
import { UserAddress } from "@/types/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(request: NextRequest) {
    await connectDatabase();
    const session = await getServerSession(authOptions);

    try {
        const body: UserAddress = await request.json();

        if (!session?.user?._id){
            return NextResponse.json({
                success: false,
                message: 'Invalid user'
            }, { status: 400 })
        }

        const addressSchema = z.object({
            street: z.string().min(1),
            code: z.string().min(1),
            city: z.string().min(1),
        })

        const data = addressSchema.parse({
            street: body.street,
            code: body.code,
            city: body.city,
        })

        let userAdresses = await Users.findOne({ _id: session.user._id }, { addresses: 1 });

        if(userAdresses?.addresses.length >= 3){
            return NextResponse.json({
                success: false,
                message: 'Możesz dodać maksymalnie 3 adresy!'
            }, { status: 400 });
        };

        let update = await Users.findOneAndUpdate({ _id: session.user._id },{"$push": {addresses: {
            ...data,
            id: new Date().getTime(),
            country: 'Poland'
        }}});

        return NextResponse.json({ status: 200 })
    }
    catch (error) {

        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest) {
    await connectDatabase();
    const session = await getServerSession(authOptions);

    try {
        const body: {id: string} = await request.json();

        if (!session?.user?._id){
            return NextResponse.json({
                success: false,
                message: 'Invalid user'
            }, { status: 400 })
        }

        let update = await Users.findOneAndUpdate({ _id: session.user._id },{"$pull": {addresses: {
            id: body.id
        }}});

        return NextResponse.json({ status: 200 })
    }
    catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        }, { status: 400 });
    }
};

export async function PATCH(request: NextRequest) {
    await connectDatabase();
    const session = await getServerSession(authOptions);

    try {
        const body: UserAddress = await request.json();

        if (!session?.user?._id){
            return NextResponse.json({
                success: false,
                message: 'Invalid user'
            }, { status: 400 })
        }

        const addressSchema = z.object({
            street: z.string().min(1),
            code: z.string().min(1),
            city: z.string().min(1),
        })

        const data = addressSchema.parse({
            street: body.street,
            code: body.code,
            city: body.city,
        })

        let update = await Users.findOneAndUpdate({ _id: session.user._id, "addresses.id": body.id },{"$set": {
            "addresses.$.street": data.street,
            "addresses.$.code": data.code,
            "addresses.$.city": data.city,
        }});

        return NextResponse.json({ status: 200 })
    }
    catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        }, { status: 400 });
    }
}