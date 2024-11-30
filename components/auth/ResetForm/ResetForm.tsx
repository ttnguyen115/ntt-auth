'use client';

import { memo, useState, useTransition } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { reset } from '@/actions';

import { AppRoutes, ResetSchema } from '@/configs';

import CardWrapper from '@/components/shared/CardWrapper';
import FormError from '@/components/shared/FormError';
import FormSuccess from '@/components/shared/FormSuccess';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { ResetSchemaValues } from '@/types';

function ResetForm() {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const [isPending, startTransition] = useTransition();

    const form = useForm<ResetSchemaValues>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = (values: ResetSchemaValues) => {
        setError('');

        startTransition(() => {
            reset(values).then((result) => {
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
            backButtonLabel="Back to login"
            headerLabel="Forgot your password?"
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
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        className="w-full"
                        disabled={isPending}
                        type="submit"
                    >
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

export default memo(ResetForm);
