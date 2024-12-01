import { db } from '@/lib/db';

/**
 * This function is used for get 2FA confirmation by user ID
 * @param {string} userId
 * @returns {Promise<TwoFactorConfirmation>} token
 */
export async function getTwoFactorConfirmationByUserId(userId: string) {
    try {
        return await db.twoFactorConfirmation.findUnique({
            where: { userId },
        });
    } catch {
        return null;
    }
}
