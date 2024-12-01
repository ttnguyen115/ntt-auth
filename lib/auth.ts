import { auth } from '@/auth';
import { ExtendedUser } from '@/next-auth';

/**
 *  This function is used for server pages in /app
 *  @returns {Promise<ExtendedUser | undefined>} user
 */
export async function currentUser(): Promise<ExtendedUser | undefined> {
    const session = await auth();

    return session?.user;
}
