'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail, getUserByEmail } from '@/fetchers';

import { AppRoutes, LoginSchema } from '@/configs';

import { db } from '@/lib/db';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens';

import type { ILoginResponse, LoginSchemaValues } from '@/types';

/**
 * This is server function to handle login by email-password credential
 * @param {LoginSchemaValues} values
 * @param {string | null} callbackUrl
 * @returns {Promise<ILoginResponse>}
 */
// eslint-disable-next-line consistent-return
async function login(values: LoginSchemaValues, callbackUrl?: string | null): Promise<ILoginResponse | undefined> {
    const { error, data } = LoginSchema.safeParse(values);

    if (error) {
        return {
            success: false,
            error: 'Invalid fields!',
        };
    }

    const { email, password, code } = data as LoginSchemaValues;
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {
            success: false,
            error: 'Email does not exist!',
        };
    }

    // Email verification
    if (!existingUser.emailVerified) {
        const { email: emailToVerify, token } = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(emailToVerify, token);

        return {
            success: true,
            message: 'Confirm verification token!',
        };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
            if (!twoFactorToken || twoFactorToken.token !== code) {
                return {
                    success: false,
                    error: 'Invalid code!',
                };
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();
            if (hasExpired) {
                return {
                    success: false,
                    error: 'Code expired!',
                };
            }

            // Delete token after the code is valid
            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id },
            });

            // Check, delete and create new 2FA logged-in session
            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id },
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                },
            });
        } else {
            const { email: email2FA, token } = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorTokenEmail(email2FA, token);

            return { twoFactor: true };
        }
    }

    try {
        // Can use DEFAULT_LOGIN_REDIRECT with the same value, but that var should be only used for middleware
        // Or can use custom callbackUrl to redirect
        await signIn('credentials', { email, password, redirectTo: callbackUrl || AppRoutes.SETTINGS });
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
