'use client';

import { memo, useState, useTransition } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { newPassword } from '@/actions';

import { AppRoutes, NewPasswordSchema } from '@/configs';

import { useSearchParamsBy } from '@/hooks';

import CardWrapper from '@/components/shared/CardWrapper';
import FormError from '@/components/shared/FormError';
import FormSuccess from '@/components/shared/FormSuccess';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { NewPasswordSchemaValues } from '@/types';

function NewPasswordForm() {
    const token = useSearchParamsBy('token');

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const [isPending, startTransition] = useTransition();

    const form = useForm<NewPasswordSchemaValues>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
        },
    });

    const onSubmit = (values: NewPasswordSchemaValues) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            newPassword(values, token).then((result) => {
                if (result?.success) {
                    setSuccess(result?.message);
                }
                setError(result?.error);
            });
        });
    };

    return (
        <CardWrapper
            backButtonHref={AppRoutes.LOGIN}
            backButtonLabel="Back to login"
            headerLabel="Enter a new password"
        >
            <Form {...form}>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
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
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        className="w-full"
                        disabled={isPending}
                        type="submit"
                    >
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

export default memo(NewPasswordForm);
