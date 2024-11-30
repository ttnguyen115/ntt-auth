import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { LoginSchema } from './configs';
import { getUserByEmail } from './fetchers';
import { LoginSchemaValues } from './types';

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const { success, data } = LoginSchema.safeParse(credentials);

                if (success) {
                    const { email, password } = data as LoginSchemaValues;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const matchedPassword = await bcrypt.compare(password, user.password);
                    if (matchedPassword) return user;
                }

                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
