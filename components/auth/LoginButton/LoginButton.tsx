'use client';

import { memo, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { AppRoutes } from '@/configs';

import { LoginFormContainer } from '@/containers';

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Children } from '@/types';

interface LoginButtonProps extends Children {
    mode?: 'modal' | 'redirect';
    asChild?: boolean;
}

function LoginButton({ children, mode = 'redirect', asChild }: LoginButtonProps) {
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(AppRoutes.LOGIN);
    }, [router]);

    if (mode === 'modal') {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
                <DialogContent className="p-0 w-auto bg-transparent border-none">
                    <DialogTitle />
                    <DialogDescription />
                    <LoginFormContainer />
                </DialogContent>
            </Dialog>
        );
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
