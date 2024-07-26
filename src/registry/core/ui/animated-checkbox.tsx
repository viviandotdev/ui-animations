import { motion } from 'framer-motion';
import React, { ComponentProps } from 'react';

interface AnimatedCheckboxProps extends ComponentProps<'svg'> {
  isChecked: boolean;
  className?: string;
  delay?: number;
  duration?: number;
}

export const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  isChecked,
  className,
  delay = 0,
  duration = 0.3,
}) => {
  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='3.5'
      stroke='currentColor'
      className={className}
      initial={false}
      animate={isChecked ? 'checked' : 'unchecked'}
    >
      <motion.path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.5 12.75l6 6 9-13.5'
        variants={{
          checked: {
            pathLength: 1,
            opacity: 1,
            transition: {
              duration,
              delay: delay,
            },
          },
          unchecked: {
            pathLength: 0,
            opacity: 0,
            transition: {
              duration,
            },
          },
        }}
      />
    </motion.svg>
  );
};

export default AnimatedCheckbox;
