'use server';

import { RegisterSchema } from '@/configs';

import type { RegisterSchemaValues } from '@/types';

async function register(values: RegisterSchemaValues) {
    const { error } = RegisterSchema.safeParse(values);

    if (error) {
        return {
            error: 'Invalid fields!',
        };
    }

    return {
        success: 'Email sent!',
    };
}

export default register;
