// NOTE: This file is different from @/configs/routes, this file supports for middleware only

import { AppRoutes } from './configs';

/*
 *  An array of routes that are accessible to the public
 *  These routes do not require authentication
 *  @type {string[]}
 */
export const PublicRoutes = [AppRoutes.DEFAULT, AppRoutes.VERIFICATION];

/*
 *  An array of routes that are used for authentication
 *  These routes will redirect logged-in users to /settings
 *  @type {string[]}
 */
export const AuthRoutes = [
    AppRoutes.LOGIN,
    AppRoutes.REGISTER,
    AppRoutes.AUTH_ERROR,
    AppRoutes.RESET,
    AppRoutes.NEW_PASSWORD,
];

/*
 *  The prefix for API authentication routes
 *  Routes that start with this prefix are used for API authentication purposes
 *  @type {string}
 */
export const apiAuthPrefix = AppRoutes.API_AUTH;

/*
 *  The default redirect path after logging in
 *  @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = AppRoutes.SETTINGS;
