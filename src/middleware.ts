import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import path from 'path';
import { verifyJWT } from './lib/jwt';
const publicFileRegex = /\.(.*)$/;

//Lista tras dostępnych dla niezalogowanych użytkowników
const anonymousRoutes = ['/login', '/register', '/api/user/register', '/', '/public'];

export default withAuth(
    async function middleware(request:any, response:any,) {
        const { pathname } = request.nextUrl;
        const accessToken = request.headers.get('Authorization')?.replace('Bearer ', '');

        if(pathname.startsWith('/api/restricted')){
            if(!accessToken)
                return NextResponse.json({message: "Unauthorized"}, {status: 401});

            let verification = await verifyJWT(accessToken);

            if(!verification)
                return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        return NextResponse.next();
    },
    {
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    callbacks: {
        authorized: ({ req }) => {
            const { pathname } = req.nextUrl;

            return Boolean(
                req.cookies.get('next-auth.session-token') || // check if there's a token
                req.cookies.get('__Secure-next-auth.session-token') || 
                    pathname.startsWith('/_next') || // exclude Next.js internals
                    pathname.startsWith('/static') || // exclude static files
                    pathname.startsWith('/api') || // exclude API routes
                    publicFileRegex.test(pathname) || // exclude all files in the public folder
                    anonymousRoutes.includes(pathname)
            );
        },
    },
});