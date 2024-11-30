'use server';

import { getUserByEmail } from '@/fetchers';

import { LoginSchema } from '@/configs';

import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

import type { IResetResponse, ResetSchemaValues } from '@/types';

/**
 * This is server function to handle reset account by email-password credential
 * @param {ResetSchemaValues} values
 * @returns {Promise<IResetResponse>}
 */
async function reset(values: ResetSchemaValues): Promise<IResetResponse> {
    const { error, data } = LoginSchema.safeParse(values);

    if (error) {
        return {
            success: false,
            error: 'Invalid email!',
        };
    }

    const { email } = data as ResetSchemaValues;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            success: false,
            error: 'Email not found!',
        };
    }

    const { email: returnedEmail, token } = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(returnedEmail, token);

    return {
        success: true,
        message: 'Reset email sent!',
    };
}

export default reset;
