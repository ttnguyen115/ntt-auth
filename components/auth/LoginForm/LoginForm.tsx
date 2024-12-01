'use client';

import { memo, useState, useTransition } from 'react';

import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '@/actions';

import { AppRoutes, LoginSchema } from '@/configs';

import { useSearchParamsBy } from '@/hooks';

import CardWrapper from '@/components/shared/CardWrapper';
import FormError from '@/components/shared/FormError';
import FormSuccess from '@/components/shared/FormSuccess';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { LoginSchemaValues } from '@/types';

function LoginForm() {
    const errorParam = useSearchParamsBy('error');
    const urlError =
        errorParam === 'OAuthAccountNotLinked' ? 'Email already in use with different provider!' : undefined;

    const [show2FA, setShow2FA] = useState(false);
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const [isPending, startTransition] = useTransition();

    const form = useForm<LoginSchemaValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: LoginSchemaValues) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            login(values)
                .then((result) => {
                    if (result?.success) {
                        form.reset();
                        setSuccess(result?.message);
                    }

                    if (result?.error) {
                        form.reset();
                        setError(result?.error);
                    }

                    if (result?.twoFactor) {
                        setShow2FA(true);
                    }
                })
                .catch(() => setError('Something went wrong'));
        });
    };

    const credentialFields = (
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
                                placeholder="abc@example.com"
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
                        <Button
                            size="sm"
                            variant="link"
                            asChild
                            className="px-0 font-normal"
                        >
                            <Link href={AppRoutes.RESET}>Forgot password?</Link>
                        </Button>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );

    const twoFactorField = (
        <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            disabled={isPending}
                            placeholder="123456"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );

    return (
        <CardWrapper
            backButtonHref={AppRoutes.REGISTER}
            backButtonLabel="Don't have an account?"
            headerLabel="Welcome back"
            showSocial
        >
            <Form {...form}>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div
                        data-cmp="LoginOr2FAFields"
                        className="space-y-4"
                    >
                        {show2FA ? twoFactorField : credentialFields}
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        className="w-full"
                        disabled={isPending}
                        type="submit"
                    >
                        {show2FA ? 'Confirm' : 'Login'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

export default memo(LoginForm);
