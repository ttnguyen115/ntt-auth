import { db } from '@/lib/db';

/**
 * This function is used for get verification token by the latest token
 * @param {string} token
 * @returns {Promise<Token>} token
 */
export async function getVerificationTokenByToken(token: string) {
    try {
        return await db.verificationToken.findUnique({
            where: { token },
        });
    } catch {
        return null;
    }
}

/**
 * This function is used for get verification token by email
 * @param {string} email
 * @returns {Promise<Token>} token
 */
export async function getVerificationTokenByEmail(email: string) {
    try {
        return await db.verificationToken.findFirst({
            where: { email },
        });
    } catch {
        return null;
    }
}
