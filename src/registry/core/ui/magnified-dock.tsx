'use client';
import classNames from 'classnames';
import {
  motion,
  MotionValue,
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

export type DockItem = {
  title: string;
  source: string;
};

export default function Dock() {
  const mouseX = useMotionValue(Infinity);

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
          'mx-auto flex h-16 items-end gap-2 rounded-full dark:bg-black bg-white px-4 pb-3 shadow',
        )}
      >
        {gradients.slice(0, 3).map((item, index) => (
          <AppIcon mouseX={mouseX} key={`icon-${index}`} item={item} />
        ))}

        <div className='mx-2 mt-3 h-8 w-px self-center bg-gray-100 dark:bg-gray-900'></div>

        {gradients.slice(-2).map((item, index) => (
          <AppIcon mouseX={mouseX} key={`icon-${3 + index}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

function AppIcon({ mouseX, item }: { mouseX: MotionValue; item: DockItem }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const scale = useTransform(width, [40, 100], [1, 2.5]);

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
            className='flex cursor-pointer items-center justify-center rounded-md bg-gray-100 dark:bg-zinc-900 dark:border dark:border-zinc-800'
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
                  background: `url(${item.source})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </motion.div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className='bg-white text-black shadow-sm dark:bg-black dark:text-white mb-1 h-8 border px-2 py-1.5'>
          <p>{item.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
