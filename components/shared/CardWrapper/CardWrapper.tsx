'use client';

import { memo } from 'react';

import BackButton from '@/components/shared/BackButton';
import Header from '@/components/shared/Header';
import Social from '@/components/shared/Social';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

import { Children } from '@/types';

interface CardWrapperProps extends Children {
    backButtonHref: string;
    backButtonLabel: string;
    headerLabel: string;
    showSocial?: boolean;
}

function CardWrapper({ backButtonHref, backButtonLabel, children, headerLabel, showSocial }: CardWrapperProps) {
    return (
        <Card className="w-cardWrapper shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                    href={backButtonHref}
                    label={backButtonLabel}
                />
            </CardFooter>
        </Card>
    );
}

export default memo(CardWrapper);
