import { NextResponse } from 'next/server';

import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { AppRoutes } from './configs';
import { apiAuthPrefix, AuthRoutes, DEFAULT_LOGIN_REDIRECT, PublicRoutes } from './routes';

const { auth } = NextAuth(authConfig);

// @ts-expect-error: Ah...should something idk
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = PublicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) return null;

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        // TODO: idk but when logging out, it does not redirect to AppRoutes.Login
        return NextResponse.redirect(new URL(AppRoutes.LOGIN, nextUrl));
    }

    return null;
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};