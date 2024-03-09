import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import Users from "@/models/Users";
import { UserSettingsUpdatePayload } from "@/store/api/users";
import { UserPerson } from "@/types/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(request: NextRequest) {
    await connectDatabase();
    const session = await getServerSession(authOptions);

    try {
        const body: UserPerson = await request.json();

        if (!session?.user?._id){
            return NextResponse.json({
                success: false,
                message: 'Invalid user'
            }, { status: 400 })
        }

        const personSchema = z.object({
            firstName: z.string().min(1),
            lastName: z.string().min(1),
            birthDate: z.date()
        })

        if(typeof body.birthDate === 'string')
            body.birthDate = new Date(body.birthDate);

        const data = personSchema.parse({
            firstName: body.firstName,
            lastName: body.lastName,
            birthDate: body.birthDate
        })

        let userPeople = await Users.findOne({ _id: session.user._id }, { people: 1 });

        if(userPeople?.people.length >= 3){
            return NextResponse.json({
                success: false,
                message: 'Możesz dodać maksymalnie 3 osoby!'
            }, { status: 400 });
        };

        let update = await Users.findOneAndUpdate({ _id: session.user._id },{"$push": {people: {
            ...data,
            id: new Date().getTime(),
            country: 'Poland'
        }}});

        return NextResponse.json({ status: 200 })
    }
    catch (error) {

        return NextResponse.json({
            success: false,
            message: 'Something went wrong: ' + error
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

        let update = await Users.findOneAndUpdate({ _id: session.user._id },{"$pull": {people: {
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
        const body: UserPerson = await request.json();

        if (!session?.user?._id){
            return NextResponse.json({
                success: false,
                message: 'Invalid user'
            }, { status: 400 })
        }

        const personSchema = z.object({
            firstName: z.string().min(1),
            lastName: z.string().min(1),
            birthDate: z.date()
        })

        if(typeof body.birthDate === 'string')
            body.birthDate = new Date(body.birthDate);

        const data = personSchema.parse({
            firstName: body.firstName,
            lastName: body.lastName,
            birthDate: body.birthDate
        })

        let update = await Users.findOneAndUpdate({ _id: session.user._id, "people.id": body.id },{"$set": {
            "people.$.firstName": data.firstName,
            "people.$.lastName": data.lastName,
            "people.$.birthDate": data.birthDate
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