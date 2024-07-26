import React, { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button, ButtonProps } from '@/components/ui/button';

import AnimatedCheckbox from '@/registry/core/ui/animated-checkbox';

interface CopyButtonProps extends ButtonProps {
  value: string;
}

const COPY_TIMEOUT = 2000;
const ANIMATION_DURATION = 300;

const copyToClipboard = async (value: string): Promise<void> => {
  await navigator.clipboard.writeText(value);
};

export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  className,
  variant = 'outline',
  ...props
}) => {
  const [hasCopied, setHasCopied] = useState(false);
  const [showClipboard, setShowClipboard] = useState(true);

  useEffect(() => {
    if (hasCopied) {
      const copyTimer = setTimeout(() => {
        setHasCopied(false);
        const clipboardTimer = setTimeout(() => {
          setShowClipboard(true);
        }, ANIMATION_DURATION);
        return () => clearTimeout(clipboardTimer);
      }, COPY_TIMEOUT);

      return () => clearTimeout(copyTimer);
    }
  }, [hasCopied]);

  const handleCopy = useCallback(async () => {
    await copyToClipboard(value);
    setHasCopied(true);
    setShowClipboard(false);
  }, [value]);

  return (
    <Button
      size='icon'
      variant={variant}
      className={cn(
        'relative z-10 flex h-7 w-7 items-center [&_svg]:h-3.5 [&_svg]:w-3.5',
        className,
      )}
      onClick={handleCopy}
      {...props}
    >
      <span className='sr-only'>Copy</span>
      <IconWrapper>
        <AnimatedCheckbox
          duration={ANIMATION_DURATION / 1000}
          isChecked={hasCopied}
        />
      </IconWrapper>
      <IconWrapper>{showClipboard && <Icons.Clipboard />}</IconWrapper>
    </Button>
  );
};

const IconWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white'>
    {children}
  </div>
);

export default CopyButton;
