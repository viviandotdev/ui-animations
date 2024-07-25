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
  ...props
}) => {
  return (
    <svg
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={3}
      {...props}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isChecked ? 1 : 0 }}
        transition={{
          delay: delay,
          type: 'tween',
          ease: 'easeOut',
          duration: duration,
        }}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M5 13l4 4L19 7'
      />
    </svg>
  );
};

export default AnimatedCheckbox;
