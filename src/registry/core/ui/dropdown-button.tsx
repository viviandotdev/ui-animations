import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DropdownButtonProps {
  className?: string;
}

const options = ['All Difficulty', 'Easy', 'Medium', 'Hard'] as const;

type OptionType = (typeof options)[number];

function DropdownOption({
  value,
  currentValue,
  onSelect,
}: {
  value: OptionType;
  currentValue: OptionType;
  onSelect: (value: OptionType) => void;
}) {
  return (
    <DropdownMenuItem
      onSelect={() => onSelect(value)}
      className='relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-8 text-sm outline-none transition-colors focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50'
    >
      <span>{value}</span>
      {currentValue === value && (
        <span className='absolute right-2 flex h-3.5 w-3.5 items-center justify-center'>
          <Check className='h-4 w-4' />
        </span>
      )}
    </DropdownMenuItem>
  );
}

function DropdownButton({ className }: DropdownButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState<OptionType>(
    options[0],
  );

  const handleSelect = (value: OptionType) => {
    setCurrentValue(value);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className='flex justify-between min-w-[120px]'
        asChild
      >
        <Button
          size='sm'
          className={cn(
            'hover:bg-white border shadow-sm bg-white text-gray-900 font-normal',
            className,
          )}
        >
          {currentValue}
          <ChevronDown
            size={16}
            strokeWidth={2}
            aria-hidden='true'
            className={cn(
              '-me-1 ms-2 opacity-60 transition-transform duration-500',
              isOpen ? 'rotate-180' : 'rotate-0',
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[120px]'>
        {options.map((option) => (
          <DropdownOption
            key={option}
            value={option}
            currentValue={currentValue}
            onSelect={handleSelect}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownButton;
