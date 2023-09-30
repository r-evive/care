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

    const verification = verifyJWT(refreshToken);

    if(!verification || verification && verification.exp && (Date.now() >= verification.exp * 1000))
        return NextResponse.json({message: "Unauthorized"}, {status: 401})

    let user:TUser | null = await Users.findOne({_id: verification._id}).lean();
    
    const {password, ...userData} = user;

    const accessToken = signJWTAccessToken(userData);


    return NextResponse.json({accessToken: accessToken}, {status: 200})
}