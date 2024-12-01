'use client';

import { logout } from '@/actions';

import { Button } from '@/components/ui/button';

function SettingsPage() {
    const onClick = () => {
        logout();
    };

    return (
        <div className="bg-white p-10 rounded-xl ">
            <Button
                onClick={onClick}
                type="submit"
            >
                Sign out
            </Button>
        </div>
    );
}

export default SettingsPage;
