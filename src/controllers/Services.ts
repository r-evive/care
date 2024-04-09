import connectDatabase from "@/lib/mongodb";
import Service, { TService } from "@/models/Service";
import Users, { TUser } from "@/models/Users";
import { TSearchService, TServiceUser } from "@/types/Service";


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


export const SearchResource = async (cityId:string, serviceId:string, query: TSearchService): Promise<TServiceUser[]> => {
    await connectDatabase();

    let careGivers:TServiceUser[] = await Users.aggregate([
        {
            $match: {
                role: 'caregiver',
            }
        },
        {$unwind: "$availability"},
        {$unwind: "$availability.blocks"},
        {
            $match:{
                $and: [
                    {
                        "availability.date": {
                            $gte: new Date()
                        }
                    },
                    {
                        "availability.blocks.status": "free"
                    }
                ]
            }
        },
        {
            $group: {
                _id: {
                    id: "$_id",
                    date: "$availability.date"
                },
                firstName: {$first: "$firstName"},
                lastName: {$first: "$lastName"},
                description: {$first: "$description"},
                blocks: {$push: "$availability.blocks"},
                date: {$first: "$availability.date"}
            }
        },
        {
            $sort: {"date": 1}
        },
        {
            $group: {
                _id: "$_id.id",
                firstName: {$first: "$firstName"},
                lastName: {$first: "$lastName"},
                description: {$first: "$description"},
                availability: {
                    $push: {
                        date: "$date",
                        blocks: "$blocks"
                    }
                }
            }
        },
        {
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                description: 1,
                availability: 1,
            }
        }
    ])

    return careGivers;
}