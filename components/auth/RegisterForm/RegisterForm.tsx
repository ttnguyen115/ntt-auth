'use client';

import { memo, useState, useTransition } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { register } from '@/actions';

import { AppRoutes, RegisterSchema } from '@/configs';

import CardWrapper from '@/components/shared/CardWrapper';
import FormError from '@/components/shared/FormError';
import FormSuccess from '@/components/shared/FormSuccess';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { RegisterSchemaValues } from '@/types';

function RegisterForm() {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const [isPending, startTransition] = useTransition();

    const form = useForm<RegisterSchemaValues>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    });

    const onSubmit = (values: RegisterSchemaValues) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            register(values).then((result) => {
                if (result?.success) {
                    setSuccess(result?.message);
                    // TODO: add success notification when adding 2FA
                }
                setError(result?.error);
            });
        });
    };

    return (
        <CardWrapper
            backButtonHref={AppRoutes.LOGIN}
            backButtonLabel="Already have an account?"
            headerLabel="Create an account"
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Example Name"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        Create an account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

export default memo(RegisterForm);
