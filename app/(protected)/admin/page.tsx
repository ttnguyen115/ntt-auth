'use client';

import { UserRole } from '@prisma/client';
import { toast } from 'sonner';

import { admin } from '@/actions';

import { AppRoutes } from '@/configs';

import RoleGate from '@/components/auth/RoleGate';
import FormSuccess from '@/components/shared/FormSuccess';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function AdminPage() {
    const onApiRouteClick = () => {
        fetch(AppRoutes.API_ADMIN).then((response) => {
            if (response.ok) {
                toast.success('Allowed API Route!');
            } else {
                toast.error('Forbidden API Route!');
            }
        });
    };

    const onServerActionClick = () => {
        admin().then((response) => {
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.error);
            }
        });
    };

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">Admin</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content!" />
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Admin-only API Route</p>
                    <Button onClick={onApiRouteClick}>Click to test</Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Admin-only Server Action</p>
                    <Button onClick={onServerActionClick}>Click to test</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default AdminPage;
