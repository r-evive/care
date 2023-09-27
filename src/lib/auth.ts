import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDatabase from "./mongodb";
import Users from "@/models/Users";
import { SHA256 } from "crypto-js";


type Credentials = {
    email: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login',
        error: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials: Credentials, req: any){
                await connectDatabase();
                
                let { email, password } = credentials;

                password = SHA256(password).toString();

                const user = await Users.findOne({
                    email: email,
                    password: password,
                });

                if(user){
                    delete user.password;
                    return user;
                }
                else{
                    return null;
                }
            }
        } as any)
    ],
    callbacks: {
        session: async ({user, session}:any) => {
            console.log('session: ', {session, user});
            if(user && user._id){
                session.id = user._id;
            }
            return session;
        },
        jwt: async ({token, user}:any) => {
            if(user && user._id){
                token.id = user._id;
            }
            console.log(token, user);
            return token;
        }
    } as any,
}