'use client';

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import { ResizablePanel } from '@/registry/core/ui/resizable-panel';

const variants = {
  enter: (direction: number) => {
    return { x: `${100 * direction}%` };
  },
  center: { x: '0%' },
  exit: (direction: number) => {
    return { x: `${-100 * direction}%` };
  },
};

const transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.3,
};

export default function Page() {
  const [monthString, setMonthString] = useState(format(new Date(), 'yyyy-MM'));
  const [direction, setDirection] = useState<number>();
  const [isAnimating, setIsAnimating] = useState(false);
  const { theme } = useTheme();
  const month = parse(monthString, 'yyyy-MM', new Date());

  function nextMonth() {
    if (isAnimating) return;
    const next = addMonths(month, 1);

    setMonthString(format(next, 'yyyy-MM'));
    setDirection(1);
    setIsAnimating(true);
  }

  function previousMonth() {
    if (isAnimating) return;
    const previous = subMonths(month, 1);

    setMonthString(format(previous, 'yyyy-MM'));
    setDirection(-1);
    setIsAnimating(true);
  }

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  return (
    <MotionConfig transition={transition}>
      <div className='flex w-full items-start py-16 text-stone-900 dark:text-stone-100'>
        <div className='relative mx-auto w-full max-w-xs overflow-hidden rounded-2xl'>
          <div className='py-8'>
            <div className='flex flex-col px-3 justify-center rounded-2xl text-center border shadow-md py-4 bg-white dark:bg-black'>
              <ResizablePanel>
                <AnimatePresence
                  mode='popLayout'
                  initial={false}
                  custom={direction}
                  onExitComplete={() => setIsAnimating(false)}
                >
                  <motion.div
                    key={monthString}
                    initial='enter'
                    animate='center'
                    exit='exit'
                  >
                    <header className='relative flex justify-between px-8'>
                      <div className='border relative w-full flex justify-between py-1 dark:border-stone-700'>
                        <motion.button
                          variants={{
                            exit: { visibility: 'hidden' },
                          }}
                          className='z-10 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-700'
                          onClick={previousMonth}
                        >
                          <ChevronLeftIcon className='h-4 w-4' />
                        </motion.button>
                        <motion.p
                          variants={variants}
                          custom={direction}
                          className='z-0 absolute inset-0 flex items-center justify-center font-semibold'
                        >
                          {format(month, 'MMMM yyyy')}
                        </motion.p>
                        <motion.button
                          variants={{
                            exit: { visibility: 'hidden' },
                          }}
                          className='z-10 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-700'
                          onClick={nextMonth}
                        >
                          <ChevronRightIcon className='h-4 w-4' />
                        </motion.button>
                      </div>

                      <motion.div
                        className='absolute inset-0 rounded-2xl border dark:border-stone-700'
                        style={{
                          backgroundImage: `
                          linear-gradient(
                            to right,
                            ${theme == 'dark' ? 'black' : 'white'} 15%,
                            transparent 30%,
                            transparent 70%,
                            ${theme == 'dark' ? 'black' : 'white'} 85%
                            )
                            `,
                        }}
                        variants={{
                          exit: { visibility: 'hidden' },
                        }}
                      />
                    </header>
                    <motion.div
                      variants={{
                        exit: { visibility: 'hidden' },
                      }}
                      className='mt-4 grid grid-cols-7 gap-y-4 px-2 text-sm'
                    >
                      <span className='font-medium text-stone-500 dark:text-stone-400'>
                        Su
                      </span>
                      <span className='font-medium text-stone-500 dark:text-stone-400'>
                        Mo
                      </span>
                      <span className='font-medium text-stone-500 dark:text-stone-400'>
                        Tu
                      </span>
                      <span className='font-medium text-stone-500 dark:text-stone-400'>
                        We
                      </span>
                      <span className='font-medium text-stone-500 dark:text-stone-400'>
                        Th
                      </span>
                      <span className='font-medium text-stone-500 dark:text-stone-400'>
                        Fr
                      </span>
                      <span className='font-medium text-stone-500 dark:text-stone-400'>
                        Sa
                      </span>
                    </motion.div>

                    <motion.div
                      variants={variants}
                      custom={direction}
                      className='mt-4 grid grid-cols-7 gap-y-4 px-2 text-sm'
                    >
                      {days.map((day) => (
                        <span
                          className={`${
                            isSameMonth(day, month)
                              ? ''
                              : 'text-stone-300 dark:text-stone-600'
                          } font-semibold`}
                          key={format(day, 'yyyy-MM-dd')}
                        >
                          {format(day, 'd')}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
