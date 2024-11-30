'use server';

import { getUserByEmail, getVerificationTokenByToken } from '@/fetchers';

import { db } from '@/lib/db';

import { IVerificationResponse } from '@/types';

/**
 * This is server function to handle verify link for new user
 * @param {string} token
 * @returns {Promise<IVerificationResponse>}
 */
async function newVerification(token: string): Promise<IVerificationResponse> {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return {
            success: false,
            error: 'Token does not exist!',
        };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {
            success: false,
            error: 'Token has expired!',
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return {
            success: false,
            error: 'User does not exist!',
        };
    }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            email: existingUser.email,
            emailVerified: new Date(),
        },
    });

    await db.verificationToken.delete({
        where: { id: existingToken.id },
    });

    return {
        success: true,
        message: 'Email verified!',
    };
}

export default newVerification;
