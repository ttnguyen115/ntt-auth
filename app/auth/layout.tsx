import { Children } from '@/types';

function AuthLayout({ children }: Children) {
    return <div className="h-full flex items-center justify-center bg-layout">{children}</div>;
}

export default AuthLayout;
