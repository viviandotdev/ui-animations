'use client';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface AnimatedTabsProps {}

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'lab', label: 'Lab' },
  { id: 'books', label: 'Reading' },
];

export const AnimatedTabs: React.FC<AnimatedTabsProps> = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <div className='inset-x-0 z-50 mx-auto w-fit rounded-full border border-gray-200 shadow-sm'>
      <div
        style={{
          boxShadow:
            '0px 3px 3.3px 0px #E8E8E8 inset, 0px 1px 1px 0px #F7F7F7 inset',
        }}
        className='flex space-x-4 rounded-full bg-gray-gradient p-2 shadow-inner'
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={classNames(
              'relative flex cursor-pointer select-none items-center justify-center rounded-full px-4 py-2 text-base transition-colors',
              {
                'text-black': activeTab === tab.id,
                'text-[#878787] hover:text-black': activeTab !== tab.id,
              },
            )}
          >
            <span className='relative z-20'>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId='activeTab'
                className='absolute inset-0 z-10 rounded-full bg-white'
                style={{
                  boxShadow:
                    '0px 3px 4px -1px rgba(95, 95, 95, 0.10), 0px -1px 2px 0px #E3E3E3 inset, 0px 0px 1px 0px #D3D3D3 inset',
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
