import { Children } from '@/types';

function AuthLayout({ children }: AuthLayoutProps) {
    return <div className="h-full flex items-center justify-center bg-layout">{children}</div>;
}

type AuthLayoutProps = Children;

export default AuthLayout;
