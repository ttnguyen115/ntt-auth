'use client';

import { memo, ReactNode } from 'react';

import { logout } from '@/actions';

interface LogoutButtonProps {
    children?: ReactNode;
}

function LogoutButton({ children }: LogoutButtonProps) {
    const onClick = () => {
        logout();
    };

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <span
            className="cursor-pointer"
            onClick={onClick}
        >
            {children}
        </span>
    );
}

export default memo(LogoutButton);
