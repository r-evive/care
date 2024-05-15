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

    console.log(cities);
    return cities;
}


export const GetCity = async (id:string): Promise<TCity | null> => {
    await connectDatabase();

    if(!id) return null;

    let city:TCity | null = await City.findById(id).lean();

    return city;
}

export const EditCity = async (id:string, name:string, country: string): Promise<boolean> => {
    await connectDatabase();
    let city = await City.findById(id);

    if(!city){
        return false;
    }

    city.name = name;
    city.country = country;

    await city.save();

    return true;
}

export const AddCity = async (name:string, country: string): Promise<string> => {
    await connectDatabase();
    let city = new City({
        name,
        country
    });

    await city.save();

    return city._id.toString();
}