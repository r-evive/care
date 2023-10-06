import getAuthorizationParamsToken from "@/hooks/useGetAuthorizationParamsToken";
import { verifyJWT } from "@/lib/jwt";
import connectDatabase from "@/lib/mongodb";
import Users, { TUser } from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    await connectDatabase();
    let data = await getAuthorizationParamsToken(request);

    console.log("Token in route", data)

    if(!params.id)
        return NextResponse.json({message: "ID is required"}, {status: 400})

    try{
        const user:TUser|null = await Users.findOne({_id: params.id}).lean();
        if(!user)
            return NextResponse.json({message: "User not found"}, {status: 404})
    
        const {password, ...userData} = user;
    
        return NextResponse.json(userData, {status: 200})
    }
    catch(error){
        return NextResponse.json({message: "User not found"}, {status: 404})
    }
}