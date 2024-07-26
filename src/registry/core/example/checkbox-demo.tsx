'use client';
import { motion, MotionConfig } from 'framer-motion';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import AnimatedCheck from '@/registry/core/ui/animated-check';

export const CheckboxDemo = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className='flex items-center'>
      <button className='relative flex items-center'>
        <input
          type='checkbox'
          className='border-blue-gray-200 relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 transition-all duration-500 checked:border-blue-500 checked:bg-blue-500'
          onChange={() => setIsChecked(!isChecked)}
        />
        <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white'>
          <AnimatedCheck isChecked={isChecked} className='h-3.5 w-3.5' />
        </div>
      </button>
      <MotionConfig transition={{ duration: 0.3, ease: 'easeInOut' }}>
        <label
          className={cn(
            'relative ml-2 overflow-hidden text-sm text-black dark:text-white',
          )}
        >
          <motion.span
            animate={{
              opacity: isChecked ? 0.5 : 1,
            }}
          >
            Take out the trash
          </motion.span>
          <motion.div
            className='absolute bottom-1/2 left-0 h-[1px] w-full bg-gray-600'
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isChecked ? 1 : 0 }}
          />
        </label>
      </MotionConfig>
    </div>
  );
};

export default CheckboxDemo;
