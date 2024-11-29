import { memo } from 'react';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button, type ButtonProps } from '@/components/ui/button';

function Social() {
    const buttonProps: ButtonProps = {
        className: 'w-full',
        onClick: () => {}, // TODO: remember to nest it inside useCallback
        size: 'lg',
        variant: 'outline',
    };

    const renderIconButtons = [FcGoogle, FaGithub].map((Icon) => (
        <Button
            key={Icon.name}
            {...buttonProps}
        >
            <Icon className="size-5" />
        </Button>
    ));

    return <div className="flex items-center w-full gap-x-2">{renderIconButtons}</div>;
}

export default memo(Social);
