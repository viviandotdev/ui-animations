'use client';

import { DropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button, ButtonProps } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import AnimatedCheck from '@/registry/core/ui/animated-check';

interface Event {
  name: string;
  properties?: Record<string, any>;
}

interface CopyButtonProps extends ButtonProps {
  value: string;
  event?: Event['name'];
}

async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value);
  if (event) {
    // trackEvent(event);
  }
}

const COPY_TIMEOUT = 2000;

export function CopyButton({
  value,
  className,
  variant = 'ghost',
  event,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const copyTimer = setTimeout(() => {
        setHasCopied(false);
      }, COPY_TIMEOUT);

      return () => clearTimeout(copyTimer);
    }
  }, [hasCopied]);

  const handleCopy = React.useCallback(() => {
    copyToClipboardWithMeta(
      value,
      event
        ? {
            name: event,
            properties: {
              code: value,
            },
          }
        : undefined,
    );
    setHasCopied(true);
  }, [value, event]);

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
        'relative z-10 h-6 w-6 text-zinc-50 hover:bg-background hover:text-zinc-50',
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
}

interface CopyWithClassNamesProps extends DropdownMenuTriggerProps {
  value: string;
  classNames: string;
  className?: string;
}

export function CopyWithClassNames({
  value,
  classNames,
  className,
}: CopyWithClassNamesProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const copyToClipboard = React.useCallback((value: string) => {
    copyToClipboardWithMeta(value);
    setHasCopied(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className={cn(
            'relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50',
            className,
          )}
        >
          {hasCopied ? (
            <Icons.Check className='h-3 w-3' />
          ) : (
            <Icons.Clipboard className='h-3 w-3' />
          )}
          <span className='sr-only'>Copy</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => copyToClipboard(value)}>
          {/* <Icons.react className='mr-2 h-4 w-4' /> */}
          <span>Component</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyToClipboard(classNames)}>
          {/* <Icons.tailwind className='mr-2 h-4 w-4' /> */}
          <span>Classname</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
