import { CircleDashed, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';

import AnimatedCheck from '@/registry/core/ui/animated-check';

import StatusButton from '../ui/status-button';

type ButtonStatus = 'idle' | 'loading' | 'success';

export const StatusButtonDemo: React.FC = () => {
  const [status, setStatus] = useState<ButtonStatus>('idle');

  return (
    <>
      <StatusButton
        status={status}
        setStatus={setStatus}
        className={`
          rounded-lg font-medium text-sm h-8 w-[172px] overflow-hidden
          bg-gradient-to-b from-orange-400 to-orange-500
          shadow-[0_0_1px_1px_rgba(255,255,255,0.08)_inset,0_1px_1.5px_0_rgba(0,0,0,0.32),0_0_0_0.5px_#f97316]
          relative text-white hover:from-orange-500 hover:to-orange-600
          transition-all duration-200
        `}
        buttonCopy={{
          idle: (
            <div className='flex items-center gap-2'>
              <ShoppingCart className='h-4 w-4' />
              Add to cart
            </div>
          ),
          loading: <CircleDashed className='h-4 w-4 animate-spin' />,
          success: (
            <div className='flex items-center gap-2'>
              <AnimatedCheck
                isChecked={true}
                className='h-4 w-4'
                duration={0.3}
              />
              Added to cart
            </div>
          ),
        }}
      />
    </>
  );
};

export default StatusButtonDemo;
