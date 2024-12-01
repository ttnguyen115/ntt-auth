'use client';

import { memo } from 'react';

import { UserRole } from '@prisma/client';

import { useCurrentRole } from '@/hooks';

import FormError from '@/components/shared/FormError';

import { Children } from '@/types';

interface RoleGateProps extends Children {
    allowedRole: UserRole;
}

function RoleGate({ children, allowedRole }: RoleGateProps) {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return <FormError message="You do not have permission to view this content!" />;
    }

    return children;
}

export default memo(RoleGate);
