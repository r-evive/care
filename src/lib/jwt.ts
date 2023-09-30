import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

type TSignOptions = {
    expiresIn?: string | number;
}


const DEAFAULT_SIGN_OPTIONS = {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
}

export function signJWTAccessToken(payload:JwtPayload, options:SignOptions = DEAFAULT_SIGN_OPTIONS){
    const token = jwt.sign(payload, String(process.env.JWT_SECRET), options);
    return token;
}

export function verifyJWT(token:string):JwtPayload|null{
    try{
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
        return decoded as JwtPayload;
    }
    catch(error){
        return null;
    }
}