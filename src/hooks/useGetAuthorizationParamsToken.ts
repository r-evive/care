import { decodeToken} from "@/lib/jwt";
import { NextRequest} from "next/server";


export default async function getAuthorizationParamsToken(request: NextRequest):Promise<any> {
    let accessToken = request.headers.get('Authorization')?.replace('Bearer ', '');

    if(!accessToken)
        return null

    const verification = decodeToken(accessToken);

    return verification;
}