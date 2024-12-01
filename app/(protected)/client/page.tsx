'use client';

import UserInfo from '@/app/(protected)/_components/UserInfo';

import { useCurrentUser } from '@/hooks';

function ServerPage() {
    const user = useCurrentUser();

    return (
        <UserInfo
            label="Client component"
            user={user}
        />
    );
}

export default ServerPage;
