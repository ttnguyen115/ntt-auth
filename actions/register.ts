'use server';

import bcrypt from 'bcryptjs';

import { getUserByEmail } from '@/fetchers';

import { RegisterSchema } from '@/configs';

import { db } from '@/lib/db';

import type { RegisterSchemaValues } from '@/types';

async function register(values: RegisterSchemaValues) {
    const { error, data } = RegisterSchema.safeParse(values);
    const { name = '', email = '', password = '' } = data as RegisterSchemaValues;

    if (!name || !email || !password || error) {
        return { error: 'Invalid fields!' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: 'Email already in use!' };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    // TODO: Send verification token email

    return { success: 'Email sent!' };
}

export default register;
