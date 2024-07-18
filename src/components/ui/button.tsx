import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

interface ButtonProps
  extends VariantProps<typeof buttonClasses>,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
}
const buttonClasses = cva('relative inline-flex items-center', {
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
    },
    size: {
      small: 'text-xs px-3 h-7',
      medium: 'text-sm px-4 h-8',
      large: 'text-md px-6 h-12',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});
export const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className='highlight'>{children}</span>
);

export const Button = ({
  children,
  href,
  variant,
  size,
  ...props
}: ButtonProps) => {
  return (
    <Link
      {...props}
      className={buttonClasses({ variant, size, className: props.className })}
      href={href}
    >
      {children}
    </Link>
  );
};
