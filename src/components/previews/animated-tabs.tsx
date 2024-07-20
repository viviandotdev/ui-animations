'use client';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'lab', label: 'Lab' },
  { id: 'books', label: 'Reading' },
];

export const AnimatedTabs: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = resolvedTheme === 'dark';

  const outerShadow = isDarkMode
    ? '0px 3px 3.3px 0px #171717 inset, 0px 1px 1px 0px #2D2C2C inset'
    : '0px 3px 3.3px 0px #E8E8E8 inset, 0px 1px 1px 0px #F7F7F7 inset';

  const activeShadow = isDarkMode
    ? '0px 3px 4px -1px rgba(0, 0, 0, 0.2), 0px -1px 2px 0px #333333 inset, 0px 0px 1px 0px #404040 inset'
    : '0px 3px 4px -1px rgba(95, 95, 95, 0.10), 0px -1px 2px 0px #E3E3E3 inset, 0px 0px 1px 0px #D3D3D3 inset';

  return (
    <div className='inset-x-0 z-50 mx-auto w-fit rounded-full border border-gray-200 shadow-sm dark:border-[#212121] dark:shadow-md'>
      <div
        style={{
          boxShadow: outerShadow,
        }}
        className='flex space-x-4 rounded-full bg-gray-100 p-2 dark:bg-transparent'
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={classNames(
              'relative flex cursor-pointer select-none items-center justify-center rounded-full px-4 py-2 text-base transition-colors',
              {
                'text-black': activeTab === tab.id,
                'text-[#878787] hover:text-black dark:hover:text-stone-300':
                  activeTab !== tab.id,
              },
            )}
          >
            <span className='relative z-20'>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId='activeTab'
                className='absolute inset-0 z-10 rounded-full bg-white dark:bg-stone-300'
                style={{
                  boxShadow: activeShadow,
                }}
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
