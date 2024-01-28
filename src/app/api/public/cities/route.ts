import { GetAllCities } from "@/controllers/City";
import connectDatabase from "@/lib/mongodb";
import { TCity } from "@/models/City";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectDatabase();

    try{
        let cities:TCity[] = await GetAllCities();

        return NextResponse.json(cities, {status: 200})
    }
    catch(error){
        return NextResponse.json({message: "Something went wrong!"}, {status: 400})
    }
}