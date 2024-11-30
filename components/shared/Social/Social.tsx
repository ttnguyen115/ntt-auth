'use client';

import { memo } from 'react';

import { IconType } from 'react-icons';

import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { AppRoutes } from '@/configs';

import { Button, type ButtonProps } from '@/components/ui/button';

interface SocialCredential {
    id: string;
    name: 'google' | 'github';
    Icon: IconType;
}

const socialCredentials: SocialCredential[] = [
    {
        id: 'google',
        name: 'google',
        Icon: FcGoogle,
    },
    {
        id: 'github',
        name: 'github',
        Icon: FaGithub,
    },
];

function Social() {
    const onClick = (provider: 'google' | 'github') => {
        signIn(provider, {
            redirectTo: AppRoutes.SETTINGS,
        });
    };

    const buttonProps: ButtonProps = {
        className: 'w-full',
        role: 'button',
        size: 'lg',
        variant: 'outline',
    };

    const renderIconButtons = socialCredentials.map(({ id, name, Icon }) => (
        <Button
            key={id}
            aria-label={name}
            onClick={() => onClick(name)}
            {...buttonProps}
        >
            <Icon className="size-5" />
        </Button>
    ));

    return <div className="flex items-center w-full gap-x-2">{renderIconButtons}</div>;
}

export default memo(Social);
