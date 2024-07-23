'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useId, useState } from 'react';

import { cn } from '@/lib/utils';

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'lab', label: 'Lab' },
  { id: 'reading', label: 'Reading' },
];

export const AnimatedTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [mounted, setMounted] = useState(false);
  const id = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        'inset-x-0 border-gray-200 z-50 mx-auto w-fit rounded-full border shadow-sm',
        'dark:border-[#212121] dark:shadow-md',
      )}
    >
      <div
        className={cn(
          'flex space-x-4 rounded-full p-2',
          'bg-gray-100 shadow-[0px_3px_3.3px_0px_#E8E8E8_inset,0px_1px_1px_0px_#F7F7F7_inset]',
          'dark:bg-transparent dark:shadow-[0px_3px_3.3px_0px_#171717_inset,0px_1px_1px_0px_#2D2C2C_inset]',
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative flex cursor-pointer select-none items-center justify-center rounded-full px-4 py-2 text-base transition-colors',
              {
                'text-black': activeTab === tab.id,
                'text-[#878787] hover:text-black': activeTab !== tab.id,
                'dark:hover:text-stone-300': activeTab !== tab.id,
              },
            )}
          >
            <span className='relative z-20'>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId={'active-tab-' + id}
                className={cn(
                  'absolute inset-0 z-10 rounded-full',
                  'bg-white shadow-[0px_3px_4px_-1px_rgba(95,95,95,0.10),0px_-1px_2px_0px_#E3E3E3_inset,0px_0px_1px_0px_#D3D3D3_inset]',
                  'dark:bg-stone-300 dark:shadow-[0px_3px_4px_-1px_rgba(0,0,0,0.2),0px_-1px_2px_0px_#333333_inset,0px_0px_1px_0px_#404040_inset]',
                )}
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.6,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTabs;
