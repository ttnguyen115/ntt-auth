'use server';

import { UserRole } from '@prisma/client';

import { currentRole } from '@/lib/auth';

interface TestAdminResponse {
    success: boolean;
    error?: string;
    message?: string;
}

/**
 * This is TEST-ONLY server function
 * @returns {Promise<TestAdminResponse>} response
 */
async function admin(): Promise<TestAdminResponse> {
    const role = await currentRole();

    if (role !== UserRole.ADMIN) {
        return {
            success: false,
            error: 'Forbidden Server Actions!',
        };
    }

    return {
        success: true,
        message: 'Allowed Server Actions',
    };
}

export default admin;
