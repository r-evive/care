import { Account, NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDatabase from "./mongodb";
import Users, { TUser } from "@/models/Users";
import { SHA256 } from "crypto-js";
import { JWT } from "next-auth/jwt";
import axios from "axios";


type Credentials = {
    email: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials: Credentials, req: any){
                await connectDatabase();
                
                let { email, password } = credentials;

                try{
                    const data = await axios.post<TUser>(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {email, password});
                    return data.data;
                }
                catch(error){
                    console.log(error);
                    return null;
                }
            }
        } as any)
    ],
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async jwt({token, user, session, account}:any): Promise<JWT>{
            if(user){
                return {
                    ...token,
                    user: {
                        ...user,
                        id: user._id.toString(),
                    }
                }
            }

            return token;
        },
        async session({session, token, user}:any): Promise<Session>{
            return {
                ...session,
                user: {
                    ...token.user,
                }
            }
        }
    },
    cookies: {
        sessionToken: {
          name: 'next-auth.session-token',
          options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            domain: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_URL : 'localhost:3000',
          },
        },
      }
}