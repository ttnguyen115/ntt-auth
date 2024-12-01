import Navbar from '@/app/(protected)/_components/Navbar';

import { Children } from '@/types';

function ProtectedLayout({ children }: Children) {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-layout">
            <Navbar />
            {children}
        </div>
    );
}

export default ProtectedLayout;
