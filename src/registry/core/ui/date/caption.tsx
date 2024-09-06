import { add } from 'date-fns';
import { format } from 'date-fns';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import * as React from 'react';
import {
  CaptionLabelProps,
  MonthChangeEventHandler,
  useDayPicker,
} from 'react-day-picker';

import { Button } from '@/components/ui/button';

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
  duration: 0.4,
};

export function Caption(props: CaptionLabelProps): JSX.Element {
  const context = useDayPicker();
  const { months, goToMonth } = context;

  const [direction, setDirection] = React.useState<number>(0);

  const handlePreviousClick = () => {
    setDirection(-1);
    handleMonthChange(add(months[0].date, { months: -1 }));
  };

  const handleNextClick = () => {
    setDirection(1);
    handleMonthChange(add(months[0].date, { months: 1 }));
  };

  const handleMonthChange: MonthChangeEventHandler = (newMonth) => {
    goToMonth(newMonth);
    // onMonthChange?.(newMonth);
  };

  return (
    <MotionConfig transition={transition}>
      <div
        key='caption'
        className='flex items-center justify-between p-2'
        aria-live='polite'
        aria-atomic='true'
      >
        <Button className='p-1' onClick={handlePreviousClick}>
          <ArrowLeftIcon className='h-5 w-5' />
        </Button>
        <div className='flex justify-center items-center' style={{ flex: 1 }}>
          <AnimatePresence mode='popLayout' initial={false} custom={direction}>
            <motion.div
              key={months[0].date.toISOString()}
              variants={variants}
              custom={direction}
              initial='enter'
              animate='center'
              exit='exit'
              className='absolute'
            >
              <span>{format(months[0].date, 'LLLL')}</span>
              <span className='ml-1'>{format(months[0].date, 'y')}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <Button className='p-1' onClick={handleNextClick}>
          <ArrowRightIcon className='h-5 w-5' />
        </Button>
      </div>
      {/* <div
          className='absolute inset-0'
          style={{
            backgroundImage:
              'linear-gradient(to right, white 15%, transparent 30%, transparent 70%, white 85%)',
          }}
        ></div> */}
    </MotionConfig>
  );
}
