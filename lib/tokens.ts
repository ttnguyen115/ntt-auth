import crypto from 'crypto';

import { v4 as uuid } from 'uuid';

import { getTwoFactorTokenByEmail, getVerificationTokenByEmail } from '@/fetchers';

import { db } from '@/lib/db';

const ONE_HOUR = 3600 * 1000;
const ONE_HUNDRED_THOUSAND = 100_000;
const ONE_MILLION = ONE_HUNDRED_THOUSAND * 10;

/**
 * This function is used for deleting and creating a brand-new token based on email
 * @param {string} email
 * @returns {Promise<VerificationToken>} verificationToken
 */
export async function generateVerificationToken(email: string) {
    const token = uuid();
    const expires = new Date(new Date().getTime() + ONE_HOUR).toString();
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: { id: existingToken.id },
        });
    }

    return db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });
}

/**
 * This function is used for deleting and re-creating a brand-new token based on email to reset password
 * @param {string} email
 * @returns {Promise<PasswordResetToken>} token
 */
export async function generatePasswordResetToken(email: string) {
    const token = uuid();
    const expires = new Date(new Date().getTime() + ONE_HOUR).toString();
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id },
        });
    }

    return db.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        },
    });
}

/**
 * This function is used for deleting and re-creating a brand-new 2FA token based on email
 * @param {string} email
 * @returns {Promise<TwoFactorToken>} token
 */
export async function generateTwoFactorToken(email: string) {
    const token = crypto.randomInt(ONE_HUNDRED_THOUSAND, ONE_MILLION).toString();
    // TODO: Later change to 15 minutes
    const expires = new Date(new Date().getTime() + ONE_HOUR).toString();

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
        await db.twoFactorToken.delete({
            where: { id: existingToken.id },
        });
    }

    return db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        },
    });
}
