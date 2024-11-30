'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { BeatLoader } from 'react-spinners';

import { useSearchParams } from 'next/navigation';

import { newVerification } from '@/actions';

import { AppRoutes } from '@/configs';

import CardWrapper from '@/components/shared/CardWrapper';
import FormError from '@/components/shared/FormError';
import FormSuccess from '@/components/shared/FormSuccess';

function NewVerificationForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const executedRef = useRef(false);

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError('Token is missing');
            return;
        }

        newVerification(token)
            .then((result) => {
                if (result?.success) {
                    setSuccess(result?.message);
                }
                setError(result?.error);
            })
            .catch(() => {
                setError('Something went wrong!');
            });
    }, [token, success, error]);

    useEffect(() => {
        if (!executedRef.current) {
            onSubmit();
            executedRef.current = true;
        }
    }, [onSubmit]);

    return (
        <CardWrapper
            backButtonHref={AppRoutes.LOGIN}
            backButtonLabel="Back to login"
            headerLabel="Confirming your verification"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && <BeatLoader />}
                {!success && <FormError message={error} />}
                <FormSuccess message={success} />
            </div>
        </CardWrapper>
    );
}

export default memo(NewVerificationForm);
