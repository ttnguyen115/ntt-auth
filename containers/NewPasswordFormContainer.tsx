import { memo, Suspense } from 'react';

import NewPasswordForm from '@/components/auth/NewPasswordForm';

function NewPasswordFormContainer() {
    return (
        <Suspense fallback={null}>
            <NewPasswordForm />
        </Suspense>
    );
}

export default memo(NewPasswordFormContainer);
