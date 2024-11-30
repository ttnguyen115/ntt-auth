'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';

import { AppRoutes, LoginSchema } from '@/configs';

import type { LoginSchemaValues } from '@/types';

async function login(values: LoginSchemaValues) {
    const { error, data } = LoginSchema.safeParse(values);

    if (error) {
        return {
            error: 'Invalid fields!',
        };
    }

    const { email, password } = data as LoginSchemaValues;

    try {
        // Can use DEFAULT_LOGIN_REDIRECT with the same value, but that var should be only used for middleware
        // Or can use custom callbackUrl to redirect
        await signIn('credentials', { email, password, redirectTo: AppRoutes.SETTINGS });
    } catch (signInError) {
        if (signInError instanceof AuthError) {
            switch (signInError.type) {
                case 'CredentialsSignin': {
                    return { error: 'Invalid credentials!' };
                }
                default: {
                    return { error: 'Something went wrong in logging in!' };
                }
            }
        }

        throw signInError;
    }
}

export default login;
