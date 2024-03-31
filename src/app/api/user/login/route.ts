import { signJWTAccessToken } from "@/lib/jwt";
import connectDatabase from "@/lib/mongodb";
import City from "@/models/City";
import Users, { TUser, TUserSession } from "@/models/Users";
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

        if(!body.email || !body.password)
            return NextResponse.json({message: "Email and password are required"}, {status: 400})
    
        const user:TUserSession|null = await Users.findOne({email: body.email}, {
            password: 1,
            firstName: 1,
            lastName: 1,
            role: 1,
            email: 1
        }).lean();
    

        if(!user || user.password !== sha256(body.password).toString())
            return NextResponse.json({message: "Incorrect credentials"}, {status: 404})
    
        if(user && user.password)
            delete user.password;

        user.accessToken = await signJWTAccessToken(user);
        user.refreshToken = await signJWTAccessToken({_id: user._id}, {expiresIn: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || 2592000)});

        return NextResponse.json(user, {status: 200})
    }
    catch(error){
        return NextResponse.json({message: "Something went wrong!"}, {status: 400})
    }
}