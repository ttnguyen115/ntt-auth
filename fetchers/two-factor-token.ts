import { db } from '@/lib/db';

/**
 * This function is used for get 2FA token by the latest token
 * @param {string} token
 * @returns {Promise<TwoFactorToken>} token
 */
export async function getTwoFactorTokenByToken(token: string) {
    try {
        return await db.twoFactorToken.findUnique({
            where: { token },
        });
    } catch {
        return null;
    }
}

/**
 * This function is used for get 2FA token by email
 * @param {string} email
 * @returns {Promise<TwoFactorToken>} token
 */
export async function getTwoFactorTokenByEmail(email: string) {
    try {
        return await db.twoFactorToken.findFirst({
            where: { email },
        });
    } catch {
        return null;
    }
}
