import {UserRegister} from "@/types/User";
import { NextRequest, NextResponse } from "next/server";
import { Input } from "postcss";
import { transform } from "typescript";
import { RegisterUser } from "./RegisterUser";
import { TUser } from "@/models/Users";

interface InputFields {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
}


const validateProvidedMail = (email: string):boolean => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!regex.test(email))
        return false;
    return true;
}

const validateInputTypes = (input: InputFields):boolean => {
    if(!input.firstName || typeof input.firstName !== 'string')
        return false;
    if(!input.lastName || typeof input.lastName !== 'string')
        return false;
    if(!input.email || typeof input.email !== 'string')
        return false;
    if(!input.password || typeof input.password !== 'string')
        return false;
    if(!input.confirmPassword || typeof input.confirmPassword !== 'string')
        return false;
    if(!input.termsAccepted || typeof input.termsAccepted !== 'boolean')
        return false;

    return true;
}


export async function POST(req: NextRequest, res: NextResponse,) {
    if(!req.body){
        return NextResponse.json({message: 'No body provided', status: 400}, {status: 400});
    }

    try{
        const {firstName, lastName, email, password, confirmPassword, termsAccepted}:InputFields = await req.json();

        if(!firstName || !lastName || !email || !password || !confirmPassword || !termsAccepted)
            return NextResponse.json({message: 'Missing required fields', status: 400}, {status: 400});

        if(!validateInputTypes({firstName, lastName, email, password, confirmPassword, termsAccepted}) || !validateProvidedMail(email))
            return NextResponse.json({message: 'Invalid body provided', status: 400}, {status: 400});
        
        if(password !== confirmPassword){
            return NextResponse.json({message: 'Passwords do not match', status: 400}, {status: 400});
        }


        let newUser: TUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: 'user',
        }

        let result = await RegisterUser(newUser);

        return NextResponse.json({message: result.message, status: result.status}, {status: result.status});
    }
    catch(e){
        console.log(e);
        return NextResponse.json({message: 'Invalid body provided', status: 400}, {status: 400});
    }
}