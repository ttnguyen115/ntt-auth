import { memo } from 'react';

import { ExtendedUser } from '@/next-auth';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
}

function UserInfo({ user, label }: UserInfoProps) {
    const contents = [
        {
            key: 'UserInfo-id',
            fieldLabel: 'ID',
            content: user?.id,
        },
        {
            key: 'UserInfo-name',
            fieldLabel: 'Name',
            content: user?.name,
        },
        {
            key: 'UserInfo-email',
            fieldLabel: 'Email',
            content: user?.email,
        },
        {
            key: 'UserInfo-role',
            fieldLabel: 'Role',
            content: user?.role,
        },
        {
            key: 'UserInfo-isTwoFactorEnabled',
            fieldLabel: 'Two Factor Authentication',
            content: user?.isTwoFactorEnabled,
        },
    ];

    const renderContent = contents.map(({ key, fieldLabel, content }) => (
        <div
            className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
            key={key}
        >
            <p className="text-sm font-medium">{fieldLabel}</p>
            {key !== 'UserInfo - isTwoFactorEnabled' ? (
                <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{content}</p>
            ) : (
                <Badge variant={content ? 'success' : 'destructive'}>{content ? 'ON' : 'OFF'}</Badge>
            )}
        </div>
    ));

    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">{label}</p>
            </CardHeader>
            <CardContent className="space-y-4">{renderContent}</CardContent>
        </Card>
    );
}

export default memo(UserInfo);
