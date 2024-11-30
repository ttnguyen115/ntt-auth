import { memo, Suspense } from 'react';

import LoginForm from '@/components/auth/LoginForm';

function LoginFormContainer() {
    return (
        <Suspense fallback={null}>
            <LoginForm />
        </Suspense>
    );
}

export default memo(LoginFormContainer);
