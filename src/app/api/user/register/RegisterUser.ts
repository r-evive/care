import {UserRegister} from "@/types/User";
import sha256 from 'crypto-js/sha256';
import { DefaultResponse } from "@/types/Response";
import User from "@/models/Users";
import connectDatabase from "@/lib/mongodb";


export const RegisterUser = async (newUser: UserRegister): Promise<DefaultResponse> => {
    await connectDatabase();

    newUser.password = sha256(newUser.password).toString();

    const user = new User(newUser);
    const saveUser = await user.save();

    try{
        if(saveUser){
            return {
                status: 200,
                message: 'User registered successfully!'
            }
        }
    }
    catch(err: any){
        return {
            status: 400,
            message: err.message
        }
    }

    return {
        status: 400,
        message: 'User registration failed!'
    }

}