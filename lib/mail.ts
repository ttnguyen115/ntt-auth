import { Resend } from 'resend';

import { AppRoutes } from '@/configs';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * This is lib function to handle sending verification email
 * @param {string} email
 * @param {string} token
 * @returns {Promise<void>}
 */
export async function sendVerificationEmail(email: string, token: string) {
    const confirmLink = `${process.env.HOSTNAME}${AppRoutes.VERIFICATION}?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: '[ntt-auth] Confirm your email',
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    });
}
