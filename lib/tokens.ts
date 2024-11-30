import { v4 as uuid } from 'uuid';

import { getVerificationTokenByEmail } from '@/fetchers';

import { db } from '@/lib/db';

const ONE_HOUR = 3600 * 1000;

/**
 * This function is used for deleting and creating a brand-new token based on email
 * @param {string} email
 * @returns {Promise<{id: string, email: string, token: string, expires: Date}>} verificationToken
 */
export async function generateVerificationToken(email: string) {
    const token = uuid();
    const expires = new Date(new Date().getTime() + ONE_HOUR).toUTCString();
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
