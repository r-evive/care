import connectDatabase from "@/lib/mongodb";
import Service, { TService } from "@/models/Service";


export const GetAllSerivices = async (): Promise<TService[]> => {
    await connectDatabase();
    let services:TService[] = await Service.find().lean();
    services = services.map(service => {
        if(service._id)
            service._id = service._id.toString();
        return service;
    });

    return services;
}