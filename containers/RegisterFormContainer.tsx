import { memo } from 'react';

import RegisterForm from '@/components/auth/RegisterForm';

function RegisterFormContainer() {
    return <RegisterForm />;
}

export default memo(RegisterFormContainer);
