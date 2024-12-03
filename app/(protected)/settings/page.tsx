'use client';

import { useCallback, useState, useTransition } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@prisma/client';
import { useSession } from 'next-auth/react';

import { settings } from '@/actions';

import { SettingsSchema } from '@/configs';

import { useCurrentUser } from '@/hooks';

import FormError from '@/components/shared/FormError';
import FormSuccess from '@/components/shared/FormSuccess';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import { SettingSchemaValues } from '@/types';

function SettingsPage() {
    const { update } = useSession();

    const user = useCurrentUser();

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<SettingSchemaValues>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        },
    });

    const onSubmit = useCallback(
        (values: SettingSchemaValues) => {
            startTransition(() => {
                settings(values)
                    .then((result) => {
                        if (result.error) {
                            setError(result.error);
                        }

                        if (result.success) {
                            update();
                            setSuccess(result.message);
                        }
                    })
                    .catch(() => setError('Something went wrong!'));
            });
        },
        [update]
    );

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">Settings</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder={user?.name || 'Something new'}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {!user?.isOAuth && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder={user?.email || 'sample@email.com'}
                                                        type="email"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="******"
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="******"
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            defaultValue={field.value}
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                                                <SelectItem value={UserRole.USER}>User</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {!user?.isOAuth && (
                                <FormField
                                    control={form.control}
                                    name="isTwoFactorEnabled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Two factor authentication</FormLabel>
                                                <FormDescription>
                                                    Enable two factor authentication for your account
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    disabled={isPending}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default SettingsPage;
