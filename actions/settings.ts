'use server';

import bcrypt from 'bcryptjs';

import { update } from '@/auth';
import { getUserByEmail, getUserById } from '@/fetchers';

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';

import { ISettingsResponse, SettingSchemaValues } from '@/types';

/**
 * This is server function for server settings page
 * @param {SettingSchemaValues} values
 * @returns {Promise<ISettingsResponse>} response
 */
async function settings(values: SettingSchemaValues): Promise<ISettingsResponse> {
    const user = await currentUser();
    if (!user) {
        return {
            success: false,
            error: 'Unauthorized!',
        };
    }

    const dbUser = await getUserById(user.id as string);
    if (!dbUser) {
        return {
            success: false,
            error: 'Unauthorized!',
        };
    }

    if (user.isOAuth) {
        delete values.email;
        delete values.password;
        delete values.newPassword;
        delete values.isTwoFactorEnabled;
    }

    // Handle changes in email
    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);
        if (existingUser && existingUser.id !== user.id) {
            return {
                success: false,
                error: 'Email already in use!',
            };
        }

        const { email, token } = await generateVerificationToken(values.email);
        await sendVerificationEmail(email, token);

        return {
            success: true,
            message: 'Verification email sent!',
        };
    }

    // Handle changes in password
    if (values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(values.password, dbUser.password);
        if (!passwordsMatch) {
            return {
                success: false,
                error: 'Passwords do not match!',
            };
        }

        values.password = await bcrypt.hash(values.newPassword, 10);
        delete values.newPassword;
    }

    const { name, email, isTwoFactorEnabled, role } = await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values,
        },
    });

    update({
        user: {
            name,
            email,
            isTwoFactorEnabled,
            role,
        },
    });

    return {
        success: true,
        message: 'Settings updated successfully!',
    };
}

export default settings;
