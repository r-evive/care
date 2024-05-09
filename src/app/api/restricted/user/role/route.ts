import { changeUserRole } from "@/controllers/User";
import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import Users from "@/models/Users";
import { UserRoleUpdatePayload,  } from "@/store/api/users";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectDatabase();
    const session = await getServerSession(authOptions);

    try {
        const body: UserRoleUpdatePayload = await request.json();

        if (!session?.user?._id){
            return NextResponse.json({
                success: false,
                message: 'Invalid user'
            }, { status: 400 })
        }

        let result = await changeUserRole(body.userId, body.role);

        if(!result){
            return NextResponse.json({
                success: false,
                message: 'Coś poszło nie tak! Spróbuj ponownie później!',
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: 'User role updated'
        }, { status: 200 })

    }
    catch (error) {
        return NextResponse.json({
            message: 'Coś poszło nie tak! Spróbuj ponownie później!',
        }, { status: 400 })
    }
}