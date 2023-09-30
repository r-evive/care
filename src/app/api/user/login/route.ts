import { signJWTAccessToken } from "@/lib/jwt";
import connectDatabase from "@/lib/mongodb";
import Users, { TUser } from "@/models/Users";
import sha256 from 'crypto-js/sha256';
import { NextRequest, NextResponse } from "next/server";

type LoginRequest = {
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {
    await connectDatabase();

    try{
        const body: LoginRequest = await request.json();
        console.log('body', body)
        if(!body.email || !body.password)
            return NextResponse.json({message: "Email and password are required"}, {status: 400})
    
        const user:TUser|null = await Users.findOne({email: body.email}).lean();
    
        if(!user || user.password !== sha256(body.password).toString())
            return NextResponse.json({message: "Incorrect credentials"}, {status: 404})
    
        const {password, ...userData} = user;

        userData.accessToken = signJWTAccessToken(userData);
        userData.refreshToken = signJWTAccessToken({_id: userData._id}, {expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME});
    
        return NextResponse.json(userData, {status: 200})
    }
    catch(error){
        return NextResponse.json({message: "Something went wrong!"}, {status: 400})
    }
}