import {UserRegister} from "@/types/User";
import sha256 from 'crypto-js/sha256';
import { DefaultResponse } from "@/types/Response";
import User, { TUser } from "@/models/Users";
import connectDatabase from "@/lib/mongodb";


export const RegisterUser = async (newUser: TUser): Promise<DefaultResponse> => {
    await connectDatabase();
    if(!newUser.password) return {
        status: 400,
        message: 'Password is required!'
    }
    
    newUser.password = sha256(newUser.password).toString();
    
    try{
        const user = new User(newUser);
        const saveUser = await user.save();
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