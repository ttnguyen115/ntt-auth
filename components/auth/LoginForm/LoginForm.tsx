'use client';

import { memo, useState, useTransition } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '@/actions';

import { AppRoutes, LoginSchema } from '@/configs';

import CardWrapper from '@/components/shared/CardWrapper';
import FormError from '@/components/shared/FormError';
import FormSuccess from '@/components/shared/FormSuccess';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { LoginSchemaValues } from '@/types';

function LoginForm() {
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
            login(values).then((result) => {
                setError(result.error);
                setSuccess(result.success);
            });
        });
    };

    return (
        <CardWrapper
            backButtonHref={AppRoutes.REGISTER}
            backButtonLabel="Don't have an account"
            headerLabel="Welcome back"
            showSocial
        >
            <Form {...form}>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="space-y-4">
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* TODO: combine FormError and FormSuccess => FormInfo || FormFeedbacks || ... */}
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        className="w-full"
                        disabled={isPending}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

export default memo(LoginForm);
