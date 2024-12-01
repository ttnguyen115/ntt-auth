'use server';

import bcrypt from 'bcryptjs';

import { getPasswordResetTokenByToken, getUserByEmail } from '@/fetchers';

import { NewPasswordSchema } from '@/configs';

import { db } from '@/lib/db';

import { INewPasswordResponse, NewPasswordSchemaValues } from '@/types';

/**
 * This is server function to handle re-creating new password
 * @param {NewPasswordSchemaValues} values
 * @param {string | null} token
 * @returns {Promise<INewPasswordResponse>}
 */
async function newPassword(values: NewPasswordSchemaValues, token?: string | null): Promise<INewPasswordResponse> {
    if (!token) {
        return {
            success: false,
            error: 'Token is missing!',
        };
    }

    // Parse
    const { data, error } = NewPasswordSchema.safeParse(values);
    if (error) {
        return {
            success: false,
            error: 'Invalid fields!',
        };
    }

    // Check if token does exist
    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
        return {
            success: false,
            error: 'Invalid token!',
        };
    }

    // Check if token is not expired
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return {
            success: false,
            error: 'Token has expired!',
        };
    }

    // Check if user does exist
    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return {
            success: false,
            error: 'Email does not exist!',
        };
    }

    // Hash password, save to db and remove password-reset token
    const { password } = data as NewPasswordSchemaValues;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    });
    await db.passwordResetToken.delete({
        where: { id: existingToken.id },
    });

    return {
        success: true,
        message: 'Password has been updated!',
    };
}

export default newPassword;
