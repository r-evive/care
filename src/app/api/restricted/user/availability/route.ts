import { setAvailability } from "@/controllers/User";
import { authOptions } from "@/lib/auth";
import { AvailabilityScope } from "@/types/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const session = await getServerSession(authOptions);

    try {
        let availability = await request.json();

        if(availability?.availability?.length <= 0)
            return NextResponse.json({
                success: false,
                message: 'Invalid availability'
            }, { status: 400 });


        if (!session?.user?._id) {
            return NextResponse.json({
                success: false,
                message: 'User not found'
            }, { status: 400 });
        }

        // Save availability to the database

        await setAvailability(session.user._id, availability);

        return NextResponse.json({ status: 200 })
    }
    catch (error) {

        return NextResponse.json({
            success: false,
            message: 'Something went wrong: ' + error
        }, { status: 400 });
    }
}
