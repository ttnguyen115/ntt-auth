import { db } from '@/lib/db';

/**
 * This function is used for getting account info by user ID
 * @param {string} userId
 * @returns {Promise<Account>} account
 */
export async function getAccountByUserId(userId: string) {
    try {
        return await db.account.findFirst({ where: { userId } });
    } catch {
        return null;
    }
}
