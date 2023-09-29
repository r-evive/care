import { UserType } from "@/models/Users";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession{
        refreshTokenExpires?: number;
        accessTokenExpires?: string;
        refreshToken?: string;
        token?: string;
        error?: string;
        user?: UserType;
      }
}

declare module "next-auth/jwt" {
    interface JWT {
        refreshTokenExpires?: number;
        accessTokenExpires?: number;
        refreshToken?: string;
        token: string;
        exp?: number;
        iat?: number;
        jti?: string;
    }
}

