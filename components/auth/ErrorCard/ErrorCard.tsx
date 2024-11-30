import { memo } from 'react';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { AppRoutes } from '@/configs';

import CardWrapper from '@/components/shared/CardWrapper';

function ErrorCard() {
    return (
        <CardWrapper
            backButtonHref={AppRoutes.LOGIN}
            backButtonLabel="Back to login"
            headerLabel="Oops! Something went wrong"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
    );
}

export default memo(ErrorCard);
