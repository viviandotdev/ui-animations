import React from 'react';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button, ButtonProps } from '@/components/ui/button';

import AnimatedCheckbox from '@/registry/core/ui/animated-checkbox';

interface CopyButtonDemoProps extends ButtonProps {
  value: string;
}

async function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value);
}

export function CopyButtonDemo({
  value,
  className,
  variant = 'outline',
  ...props
}: CopyButtonDemoProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const handleCopy = React.useCallback(() => {
    copyToClipboardWithMeta(value);
    setHasCopied(true);
  }, [value]);

  return (
    <Button
      size='icon'
      variant={variant}
      className={cn(
        '[&_svg]:h-3.5 [&_svg]:w-3.5 relative z-10 h-7 w-7 text-zinc-50 hover:bg-background hover:text-zinc-50',
        className,
      )}
      onClick={handleCopy}
      {...props}
    >
      <span className='sr-only'>Copy</span>
      {hasCopied ? (
        <AnimatedCheckbox isChecked={hasCopied} className='h-3 w-3' />
      ) : (
        <Icons.Clipboard className='h-3 w-3' />
      )}
    </Button>
  );
}
export default CopyButtonDemo;
