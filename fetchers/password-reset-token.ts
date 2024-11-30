import { db } from '@/lib/db';

/**
 * This function is used for getting password reset token by the current user token
 * @param {string} token
 * @returns {Promise<PasswordResetToken>} passwordResetToken
 */
export async function getPasswordResetTokenByToken(token: string) {
    try {
        return await db.passwordResetToken.findUnique({
            where: { token },
        });
    } catch {
        return null;
    }
}

/**
 * This function is used for getting password reset token by the current user token
 * @param {string} email
 * @returns {Promise<PasswordResetToken>} passwordResetToken
 */
export async function getPasswordResetTokenByEmail(email: string) {
    try {
        return await db.passwordResetToken.findFirst({
            where: { email },
        });
    } catch {
        return null;
    }
}
