import React, { useState } from 'react';
import { MonthGrid, MonthGridProps, useDayPicker } from 'react-day-picker';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const transition = {
  type: 'spring',
  bounce: 0,
  duration: 10,
};

export function CustomMonthGrid(props: MonthGridProps): JSX.Element {
  const { children, ...rest } = props;
  const context = useDayPicker();
  const { months, goToMonth } = context;
  const [direction, setDirection] = useState<number>(0);

  // const handleMonthChange = (newMonth: Date) => {
  //   const newDirection = newMonth > currentMonth ? 1 : -1;
  //   setDirection(newDirection);
  // };

  // useEffect(() => {
  //   context.onMonthChange = handleMonthChange;
  // }, [currentMonth]);

  return <MonthGrid {...rest}>{children}</MonthGrid>;
}

export default CustomMonthGrid;
