import { Account, NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDatabase from "./mongodb";
import Users from "@/models/Users";
import { SHA256 } from "crypto-js";
import { JWT } from "next-auth/jwt";


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
                        ...user._doc,
                        id: user._id.toString(),
                        password: undefined,
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
}