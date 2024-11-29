'use server';

import { LoginSchema } from '@/configs';

import type { LoginSchemaValues } from '@/types';

async function login(values: LoginSchemaValues) {
    const { error } = LoginSchema.safeParse(values);

    if (error) {
        return {
            error: 'Invalid fields!',
        };
    }

    return {
        success: 'Email sent!',
    };
}

export default login;
