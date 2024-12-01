import { UserRole } from '@prisma/client';

import { auth } from '@/auth';
import { ExtendedUser } from '@/next-auth';

/**
 *  This function is used for server page API route /app/server or server actions
 *  @returns {Promise<ExtendedUser | undefined>} user
 */
export async function currentUser(): Promise<ExtendedUser | undefined> {
    const session = await auth();

    return session?.user;
}

/**
 *  This function is used for server page API route /app/admin or server actions
 *  @returns {Promise<UserRole | undefined>} role
 */
export async function currentRole(): Promise<UserRole | undefined> {
    const session = await auth();

    return session?.user?.role;
}
