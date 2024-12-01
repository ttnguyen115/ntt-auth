import { memo, Suspense } from 'react';

import NewVerificationForm from '@/components/auth/NewVerificationForm';

function NewVerificationFormContainer() {
    return (
        <Suspense fallback={null}>
            <NewVerificationForm />
        </Suspense>
    );
}

export default memo(NewVerificationFormContainer);
