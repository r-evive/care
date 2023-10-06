import { signJWTAccessToken, verifyJWT } from "@/lib/jwt";
import connectDatabase from "@/lib/mongodb";
import Users, { TUser } from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";
import { type } from "os";


type RefreshTokenRequest = {
    refreshToken?: string;
}

export async function POST(request: NextRequest) {
    await connectDatabase();

    let requestData:RefreshTokenRequest = await request.json();

    const refreshToken = requestData.refreshToken ?? null;

    if(!refreshToken)
        return NextResponse.json({message: "Unauthorized"}, {status: 401})

    const verification = await verifyJWT(refreshToken);

    if(!verification)
        return NextResponse.json({message: "Unauthorized"}, {status: 401})

    let user:TUser | null = await Users.findOne({_id: verification._id}).lean();
    
    if(user && user.password)
        delete user.password;

    const accessToken = await signJWTAccessToken(user);


    return NextResponse.json({accessToken: accessToken}, {status: 200})
}