import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: [
          'text-neutral-900 bg-stone-300 border rounded-lg',
          '[&_.highlight]:ml-2',
        ],
        secondary: [
          'text-off-white bg-white bg-opacity-10 border border-transparent-white backdrop-filter-[12px] transition duration-300 hover:shadow-[inset_0_-7px_11px_#a48fff1f] ease-in',
          '[&_.highlight]:bg-transparent-white [&_.highlight]:rounded-full [&_.highlight]:px-2 [&_.highlight:last-child]:ml-2 [&_.highlight:last-child]:-mr-2 [&_.highlight:first-child]:-ml-2 [&_.highlight:first-child]:mr-2',
        ],
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        // secondary:
        //   'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      size: {
        small: 'text-xs px-3 h-7',
        medium: 'text-sm px-4 h-8',
        large: 'text-md px-6 h-12',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  },
);

export const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className='highlight'>{children}</span>
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
