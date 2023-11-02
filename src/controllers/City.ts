import connectDatabase from "@/lib/mongodb";
import City, { TCity } from "@/models/City";

export const GetAllCities = async (): Promise<TCity[]> => {
    await connectDatabase();
    let cities:TCity[] = await City.find().lean();
    cities = cities.map(city => {
        if(city._id)
            city._id = city._id.toString();
        return city;
    });

    return cities;
}