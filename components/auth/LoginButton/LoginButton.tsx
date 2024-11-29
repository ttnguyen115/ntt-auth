'use client';

import { memo } from 'react';

import { useRouter } from 'next/navigation';

import { AppRoutes } from '@/configs';

import { Children } from '@/types';

interface LoginButtonProps extends Children {
    mode?: 'modal' | 'redirect';
    asChild?: boolean;
}

function LoginButton({ children, mode = 'redirect', asChild = false }: LoginButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        console.log(`This component is asChild: ${asChild}`);
        router.push(AppRoutes.LOGIN);
    };

    if (mode === 'modal') {
        return <span>TODO: Implementing modal</span>;
    }

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <span
            className="cursor-pointer"
            onClick={handleClick}
        >
            {children}
        </span>
    );
}

export default memo(LoginButton);
