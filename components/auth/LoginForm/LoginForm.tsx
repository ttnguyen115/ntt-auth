import { memo } from 'react';

import { AppRoutes } from '@/configs';

import CardWrapper from '@/components/shared/CardWrapper';

function LoginForm() {
    return (
        <CardWrapper
            backButtonHref={AppRoutes.REGISTER}
            backButtonLabel="Don't have an account"
            headerLabel="Welcome back"
            showSocial
        >
            LoginForm
        </CardWrapper>
    );
}

export default memo(LoginForm);
