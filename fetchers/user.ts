import { db } from '@/lib/db';

/**
 * This function is used for get user info by email
 * @param {string} email
 * @returns {Promise<User>} user
 */
export async function getUserByEmail(email: string) {
    try {
        return await db.user.findUnique({ where: { email } });
    } catch {
        return null;
    }
}

/**
 * This function is used for get user info by id
 * @param {string} id
 * @returns {Promise<User>} user
 */
export async function getUserById(id: string) {
    try {
        return await db.user.findUnique({ where: { id } });
    } catch {
        return null;
    }
}
