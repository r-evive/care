import { GetAllSerivices } from "@/controllers/Services";
import connectDatabase from "@/lib/mongodb";
import { TService } from "@/models/Service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectDatabase();

    try{
        let services:TService[] = await GetAllSerivices();
        
        let city = request.nextUrl.searchParams.get('city');
        
        if(city)
            services = services.filter(service => service.city === city);
        return NextResponse.json(services, {status: 200})
    }
    catch(error){
        return NextResponse.json([], {status: 400})
    }
}