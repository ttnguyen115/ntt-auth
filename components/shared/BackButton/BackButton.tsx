'use client';

import { memo } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
    href: string;
    label: string;
}

function BackButton({ href, label }: BackButtonProps) {
    return (
        <Button
            asChild
            className="font-normal w-full"
            size="sm"
            variant="link"
        >
            <Link href={href}>{label}</Link>
        </Button>
    );
}

export default memo(BackButton);
