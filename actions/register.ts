'use server';

import bcrypt from 'bcryptjs';

import { getUserByEmail } from '@/fetchers';

import { RegisterSchema } from '@/configs';

import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';

import { IRegisterResponse, RegisterSchemaValues } from '@/types';

/**
 * This is server function to handle register by email-password credential
 * @param {RegisterSchemaValues} values
 * @returns {Promise<IRegisterResponse>}
 */
async function register(values: RegisterSchemaValues): Promise<IRegisterResponse> {
    const { error, data } = RegisterSchema.safeParse(values);
    const { name = '', email = '', password = '' } = data as RegisterSchemaValues;

    if (!name || !email || !password || error) {
        return {
            success: false,
            error: 'Invalid fields!',
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {
            success: false,
            error: 'Email already in use!',
        };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const { email: returnedEmail, token } = await generateVerificationToken(email);
    await sendVerificationEmail(returnedEmail, token);

    return {
        success: true,
        message: 'Confirm verification token!',
    };
}

export default register;
