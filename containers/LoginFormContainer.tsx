import { memo } from 'react';

import LoginForm from '@/components/auth/LoginForm';

function LoginFormContainer() {
    return <LoginForm />;
}

export default memo(LoginFormContainer);
