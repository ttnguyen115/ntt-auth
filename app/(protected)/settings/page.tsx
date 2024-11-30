import { auth, signOut } from '@/auth';

import { AppRoutes } from '@/configs';

async function SettingsPage() {
    const session = await auth();

    return (
        <div>
            {JSON.stringify(session)}
            <form
                action={async () => {
                    'use server';

                    await signOut({
                        redirectTo: AppRoutes.LOGIN,
                    });
                }}
            >
                <button type="submit">Sign out</button>
            </form>
        </div>
    );
}

export default SettingsPage;
