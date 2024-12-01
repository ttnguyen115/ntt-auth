'use client';

import { memo } from 'react';

import { ExitIcon } from '@radix-ui/react-icons';
import { FaUser } from 'react-icons/fa';

import { useCurrentUser } from '@/hooks';

import LogoutButton from '@/components/auth/LogoutButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function UserButton() {
    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger aria-label="UserButtonDropdownTrigger">
                <Avatar>
                    <AvatarImage src={user?.image || ''} />
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-40"
                align="end"
            >
                <LogoutButton>
                    <DropdownMenuItem>
                        <ExitIcon className="size-4 mr-2" />
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default memo(UserButton);
