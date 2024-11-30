import { Resend } from 'resend';

import { AppRoutes } from '@/configs';

const resend = new Resend(process.env.RESEND_API_KEY);

export enum LinkType {
    // eslint-disable-next-line no-unused-vars
    NEW,
    // eslint-disable-next-line no-unused-vars
    RESET,
}

export const generateLink = (type: LinkType, token: string) => {
    let ROUTE: string = '';

    switch (type) {
        case LinkType.NEW: {
            ROUTE = AppRoutes.VERIFICATION;
            break;
        }
        case LinkType.RESET: {
            ROUTE = AppRoutes.NEW_PASSWORD;
            break;
        }
        default:
            break;
    }

    return `${process.env.HOSTNAME}${ROUTE}?token=${token}`;
};

/**
 * This is lib function to handle sending verification email
 * @param {string} email
 * @param {string} token
 * @returns {Promise<void>}
 */
export async function sendVerificationEmail(email: string, token: string) {
    const confirmLink = generateLink(LinkType.NEW, token);

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: '[ntt-auth] Confirm your email',
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    });
}

/**
 * This is lib function to handle sending password-reset email
 * @param {string} email
 * @param {string} token
 * @returns {Promise<void>}
 */
export async function sendPasswordResetEmail(email: string, token: string) {
    const resetLink = generateLink(LinkType.RESET, token);

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: '[ntt-auth] Confirm your email',
        html: `<p>Click <a href="${resetLink}">here</a> to confirm email.</p>`,
    });
}