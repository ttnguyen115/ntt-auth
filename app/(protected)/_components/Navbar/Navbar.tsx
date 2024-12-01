'use client';

import { memo } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AppRoutes } from '@/configs';

import UserButton from '@/components/auth/UserButton';
import { Button } from '@/components/ui/button';

const navButtons = [
    {
        key: 'server',
        label: 'Server',
        path: AppRoutes.SERVER,
    },
    {
        key: 'client',
        label: 'Client',
        path: AppRoutes.CLIENT,
    },
    {
        key: 'admin',
        label: 'Admin',
        path: AppRoutes.ADMIN,
    },
    {
        key: 'settings',
        label: 'Settings',
        path: AppRoutes.SETTINGS,
    },
];

function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                {navButtons.map(({ key, label, path }) => (
                    <Button
                        asChild
                        key={key}
                        variant={pathname === path ? 'default' : 'outline'}
                    >
                        <Link href={path}>{label}</Link>
                    </Button>
                ))}
            </div>
            <UserButton />
        </nav>
    );
}

export default memo(Navbar);
