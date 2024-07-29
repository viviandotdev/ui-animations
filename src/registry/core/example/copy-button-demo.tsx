import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button, ButtonProps } from '@/components/ui/button';

import AnimatedCheck from '@/registry/core/ui/animated-check';

interface CopyButtonProps extends ButtonProps {
  value: string;
}

const COPY_TIMEOUT = 2000;

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

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), COPY_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const handleCopy = useCallback(async () => {
    await copyToClipboard(value);
    setHasCopied(true);
  }, [value]);

  const iconVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  return (
    <Button
      size='icon'
      variant={variant}
      className={cn(
        'relative z-10 flex h-7 w-7 items-center justify-center [&_svg]:h-3.5 [&_svg]:w-3.5',
        className,
      )}
      onClick={handleCopy}
      {...props}
    >
      <span className='sr-only'>Copy</span>

      <AnimatePresence mode='wait' initial={false}>
        {hasCopied ? (
          <motion.div key='check' className='absolute' {...iconVariants}>
            <AnimatedCheck
              isChecked={hasCopied}
              className='text-black'
              duration={0.3}
            />
          </motion.div>
        ) : (
          <motion.div key='copy' className='absolute' {...iconVariants}>
            <Icons.Clipboard />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default CopyButton;
