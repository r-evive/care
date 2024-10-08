import { Account, NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDatabase from "./mongodb";
import Users, { TUser, TUserSession } from "@/models/Users";
import { SHA256 } from "crypto-js";
import { JWT } from "next-auth/jwt";
import axios from "axios";
import { checkIfJWTExpired, signJWTAccessToken, verifyJWT } from "./jwt";


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
                    const data = await axios.post<TUserSession>(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {email, password});
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
        async jwt({token, user, session, account, trigger}:any): Promise<JWT>{
            if (trigger === "update" && session) {
                return { ...token, user: {
                    ...session.user,
                    id: session.user.id,
                }};
            }

            let tokenExpired = await checkIfJWTExpired(token?.user?.accessToken);
            if(tokenExpired){
                let verifyRefreshToken = await verifyJWT(token?.user?.refreshToken);
                if(verifyRefreshToken){
                    console.log("Refreshing access token");
                    const accessToken = await signJWTAccessToken(user);
                    token.user.accessToken = accessToken;
                }
            }


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
}