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
import { useState } from 'react';

const variants = {
  enter: (direction: number) => {
    return { x: `${100 * direction}%` };
  },
  center: { x: '0%' },
  exit: (direction: number) => {
    return { x: `${-100 * direction}%` };
  },
};

export default function Page() {
  const [monthString, setMonthString] = useState(format(new Date(), 'yyyy-MM'));
  const [direction, setDirection] = useState<number>();
  const month = parse(monthString, 'yyyy-MM', new Date());

  function nextMonth() {
    const next = addMonths(month, 1);

    setMonthString(format(next, 'yyyy-MM'));
    setDirection(1);
  }

  function previousMonth() {
    const previous = subMonths(month, 1);

    setMonthString(format(previous, 'yyyy-MM'));
    setDirection(-1);
  }

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });
  return (
    <MotionConfig transition={{ duration: 1 }}>
      <div className='flex w-full items-start bg-stone-800 py-16 text-stone-900'>
        <div className='relative mx-auto w-full max-w-md  overflow-hidden rounded-2xl bg-white'>
          <div className='py-8'>
            <div className='flex flex-col justify-center rounded text-center'>
              <AnimatePresence
                mode='popLayout'
                initial={false}
                custom={direction}
              >
                <motion.div
                  key={monthString}
                  initial='enter'
                  animate='center'
                  exit='exit'
                >
                  <header className='relative flex justify-between px-8'>
                    <motion.button
                      variants={{
                        exit: { visibility: 'hidden' },
                      }}
                      className='z-10 rounded-full p-1.5 hover:bg-stone-100'
                      onClick={previousMonth}
                    >
                      <ChevronLeftIcon className='h-4 w-4' />
                    </motion.button>
                    <motion.p
                      variants={variants}
                      custom={direction}
                      className='absolute inset-0 flex items-center justify-center font-semibold'
                    >
                      {format(month, 'MMMM yyyy')}
                    </motion.p>
                    <motion.button
                      variants={{
                        exit: { visibility: 'hidden' },
                      }}
                      className='z-10 rounded-full p-1.5 hover:bg-stone-100'
                      onClick={nextMonth}
                    >
                      <ChevronRightIcon className='h-4 w-4' />
                    </motion.button>
                  </header>
                  <motion.div
                    variants={{
                      exit: { visibility: 'hidden' },
                    }}
                    className='mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm'
                  >
                    <span className='font-medium text-stone-500'>Su</span>
                    <span className='font-medium text-stone-500'>Mo</span>
                    <span className='font-medium text-stone-500'>Tu</span>
                    <span className='font-medium text-stone-500'>We</span>
                    <span className='font-medium text-stone-500'>Th</span>
                    <span className='font-medium text-stone-500'>Fr</span>
                    <span className='font-medium text-stone-500'>Sa</span>
                  </motion.div>

                  <motion.div
                    variants={variants}
                    custom={direction}
                    className='mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm'
                  >
                    {days.map((day) => (
                      <span
                        className={`${
                          isSameMonth(day, month) ? '' : 'text-stone-300'
                        } font-semibold`}
                        key={format(day, 'yyyy-MM-dd')}
                      >
                        {format(day, 'd')}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
