import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useDayPicker, Weeks, WeeksProps } from 'react-day-picker';

const variants = {
  enter: (direction: number) => ({
    x: '100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: '100%',
    opacity: 0,
  }),
};

const transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.3,
};

// Define the OriginalWeeks component with a properly typed ref
const OriginalWeeks = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => {
  return <Weeks {...props} ref={ref} />;
});

const MotionWeeks = motion(OriginalWeeks);

export function CustomWeeks(props: WeeksProps): JSX.Element {
  const { children, ...rest } = props;
  const context = useDayPicker();
  const { months } = context;
  const [direction, setDirection] = useState<number>(0);

  // useEffect(() => {
  //   const currentMonth = new Date(months[0].date).getMonth();
  //   const prevMonth = new Date(months[0].date);
  //   prevMonth.setMonth(prevMonth.getMonth() - 1);

  //   setDirection(currentMonth > prevMonth.getMonth() ? 1 : -1);
  // }, [months]);

  return (
    <AnimatePresence mode='popLayout' initial={false} custom={direction}>
      <MotionWeeks
        {...rest}
        key={months[0].date.toISOString()}
        custom={direction}
        variants={variants}
        initial='enter'
        animate='center'
        exit='exit'
        transition={transition}
      >
        {children}
      </MotionWeeks>
    </AnimatePresence>
  );
}

export default CustomWeeks;
