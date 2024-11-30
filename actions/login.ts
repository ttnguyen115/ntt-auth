'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/fetchers';

import { AppRoutes, LoginSchema } from '@/configs';

import type { ILoginResponse, LoginSchemaValues } from '@/types';

/**
 * This is server function to handle login by email-password credential
 * @param {LoginSchemaValues} values
 * @returns {Promise<ILoginResponse>}
 */
// eslint-disable-next-line consistent-return
async function login(values: LoginSchemaValues): Promise<ILoginResponse | undefined> {
    const { error, data } = LoginSchema.safeParse(values);

    if (error) {
        return {
            success: false,
            error: 'Invalid fields!',
        };
    }

    const { email, password } = data as LoginSchemaValues;

    try {
        const existingUser = await getUserByEmail(email);
        if (!existingUser || !existingUser.email || !existingUser.password) {
            return {
                success: false,
                error: 'Email does not exist!',
            };
        }

        // if (!existingUser.emailVerified) {
        //     const verificationToken = await generateVerificationToken(existingUser.email);
        //     return {
        //         success: true,
        //         message: 'Confirm verification token!',
        //     };
        // }

        // Can use DEFAULT_LOGIN_REDIRECT with the same value, but that var should be only used for middleware
        // Or can use custom callbackUrl to redirect
        await signIn('credentials', { email, password, redirectTo: AppRoutes.SETTINGS });
    } catch (signInError) {
        if (signInError instanceof AuthError) {
            switch (signInError.type) {
                case 'CredentialsSignin': {
                    return {
                        success: false,
                        error: 'Invalid credentials!',
                    };
                }
                default: {
                    return {
                        success: false,
                        error: 'Something went wrong in logging in!',
                    };
                }
            }
        }

        throw signInError;
    }
}

export default login;
