import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { LoginSchema } from './configs';
import { getUserByEmail } from './fetchers';
import { LoginSchemaValues } from './types';

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
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
