import {SignJWT, jwtVerify, type JWTPayload, compactDecrypt} from 'jose';
import { decode } from 'jsonwebtoken';

type TSignOptions = {
    expiresIn: number;
}


const DEAFAULT_SIGN_OPTIONS = {
    expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME || 3600),
}

export async function signJWTAccessToken(payload:any, options: TSignOptions = DEAFAULT_SIGN_OPTIONS):Promise<string>{
    const secret = String(process.env.JWT_SECRET);
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + options.expiresIn;

    return await new SignJWT({...payload})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret));
}

export async function verifyJWT(token:string):Promise<JWTPayload|null>{
    try{
        const secret = String(process.env.JWT_SECRET);
        const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
        return payload;
    }
    catch(error){
        return null;
    }
}

export function decodeToken(token: string) {
    return decode(token);
}