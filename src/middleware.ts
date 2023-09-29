import { withAuth } from 'next-auth/middleware';
import path from 'path';
  
const publicFileRegex = /\.(.*)$/;
const anonymousRoutes = ['/login', '/register', '/api/user/register']; // The whitelisted routes

export default withAuth({
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    callbacks: {
        authorized: ({ req }) => {
            const { pathname } = req.nextUrl;
            console.log(Boolean(
                req.cookies.get('next-auth.session-token') || // check if there's a token
                    pathname.startsWith('/_next') || // exclude Next.js internals
                    pathname.startsWith('/static') || // exclude static files
                    pathname.startsWith('/api/auth') || // exclude API routes
                    publicFileRegex.test(pathname) || // exclude all files in the public folder
                    anonymousRoutes.includes(pathname)
            ));
            return Boolean(
                req.cookies.get('next-auth.session-token') || // check if there's a token
                    pathname.startsWith('/_next') || // exclude Next.js internals
                    pathname.startsWith('/static') || // exclude static files
                    pathname.startsWith('/api/auth') || // exclude API routes
                    publicFileRegex.test(pathname) || // exclude all files in the public folder
                    anonymousRoutes.includes(pathname)
            );
        },
    },
});