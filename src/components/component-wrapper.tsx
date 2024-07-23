import { cn } from '@/lib/utils';

interface ComponentWrapperProps {
  className?: string;
  children: any;
}
const ComponentWrapper = ({ className, children }: ComponentWrapperProps) => {
  return (
    <div
      className={cn(
        'relative rounded-xl md:p-20 p-10 flex justify-center items-center flex-col w-full',
        className,
      )}
    >
      {children}

      <div
        className={cn(
          `absolute inset-0 -z-10 h-full w-full [background-size:16px_16px]`,
        )}
      />
    </div>
  );
};

export default ComponentWrapper;
