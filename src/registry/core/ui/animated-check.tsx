import { motion } from 'framer-motion';
import React, { ComponentProps } from 'react';

interface AnimatedCheckProps extends ComponentProps<'svg'> {
  isChecked: boolean;
  className?: string;
  delay?: number;
  duration?: number;
}

export const AnimatedCheck: React.FC<AnimatedCheckProps> = ({
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
      initial='unchecked'
      animate={isChecked ? 'checked' : 'unchecked'}
      exit='unchecked'
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
              delay,
            },
          },
          unchecked: {
            pathLength: 0,
            opacity: 0,
            transition: {
              duration: duration / 2,
            },
          },
        }}
      />
    </motion.svg>
  );
};

export default AnimatedCheck;
