export const MAGNIFIED_DOCK_CODE = `
'use client';
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import classNames from 'classnames';

export type DockItem = {
  title: string;
  source: string;
};

export default function Dock() {
  let mouseX = useMotionValue(Infinity);

  const gradients = [
    {
      title: 'Warm Flame',
      source:
        'https://webgradients.com/public/webgradients_png/001%20Warm%20Flame.png',
    },
    {
      title: 'Frozen Dreams',
      source:
        'https://webgradients.com/public/webgradients_png/009%20Frozen%20Dreams.png',
    },
    {
      title: 'Amy Crisp',
      source:
        'https://webgradients.com/public/webgradients_png/014%20Amy%20Crisp.png',
    },
    {
      title: 'Deep Blue',
      source:
        'https://webgradients.com/public/webgradients_png/016%20Deep%20Blue.png',
    },
    {
      title: 'Wild Apple',
      source:
        'https://webgradients.com/public/webgradients_png/025%20Wild%20Apple.png',
    },
  ];

  return (
    <div className={classNames('inset-x-0 z-50 mx-auto w-fit')}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={classNames(
          'mx-auto flex h-16 items-end gap-2 rounded-full bg-white px-4 pb-3 shadow-base          '
        )}
      >
        {gradients.slice(0, 3).map((item, index) => (
          <AppIcon mouseX={mouseX} key={\`icon-\${index}\`} item={item} />
        ))}

        <div className='mx-2 mt-3 h-8 w-px self-center bg-gray-100'></div>

        {gradients.slice(-2).map((item, index) => (
          <AppIcon mouseX={mouseX} key={\`icon-\${3 + index}\`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

function AppIcon({ mouseX, item }: { mouseX: MotionValue; item: DockItem }) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  let scale = useTransform(width, [40, 100], [1, 2.5]);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <motion.div
            ref={ref}
            style={{
              width,
              height: width,
            }}
            className='flex cursor-pointer items-center justify-center rounded-md bg-gray-100'
          >
            <motion.div
              className='relative overflow-hidden rounded-full'
              style={{
                width: '23px',
                height: '23px',
                scale: scale,
              }}
            >
              <div
                className='h-full w-full rounded-full'
                style={{
                  background: \`url(\${item.source})\`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </motion.div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className='border-foreground/60 mb-1 h-8 border border-solid px-2 py-1.5'>
          <p>{item.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}


`;

export const ANIMATED_TABS_CODE = `
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

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
              }
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
`;
