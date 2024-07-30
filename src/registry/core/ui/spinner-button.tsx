'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { ButtonHTMLAttributes, useState } from 'react';

type ButtonStatus = 'idle' | 'loading' | 'success';

interface SpinnerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const buttonCopy = {
  idle: 'Send me a login link',
  loading: <Spinner className='h-4 w-4' />,
  success: 'Login link sent!',
};

function SpinnerButton({ className, ...rest }: SpinnerButtonProps) {
  const [status, setStatus] = useState<ButtonStatus>('idle');

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
    }, 1750);

    setTimeout(() => {
      setStatus('idle');
    }, 3500);
  };

  const disabled = status !== 'idle';

  return (
    <button
      type='submit'
      disabled={disabled}
      className={`${className} relative transition flex items-center justify-center duration-200`}
      onClick={handleSubmit}
      {...rest}
    >
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.span
          key={status}
          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          initial={{ y: -25, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: 25, opacity: 0 }}
        >
          {buttonCopy[status]}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

function Spinner({ className, ...rest }: SpinnerProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      className={`${className} align-center animate-spin`}
      style={{
        animationTimingFunction: 'steps(8, end)',
        animationDuration: '.75s',
      }}
      {...rest}
    >
      <rect
        style={{ opacity: 0.4 }}
        x={11}
        y={2}
        width={2}
        height={6}
        rx={1}
        fill='currentColor'
      />
      <rect
        style={{ opacity: 0.4 }}
        x={18.364}
        y={4.22183}
        width={2}
        height={6}
        rx={1}
        transform='rotate(45 18.364 4.222)'
        fill='currentColor'
      />
      <rect
        x={22}
        y={11}
        width={2}
        style={{ opacity: 0.4 }}
        height={6}
        rx={1}
        transform='rotate(90 22 11)'
        fill='currentColor'
      />
      <rect
        x={19.7782}
        y={18.364}
        width={2}
        style={{ opacity: 0.4 }}
        height={6}
        rx={1}
        transform='rotate(135 19.778 18.364)'
        fill='currentColor'
      />
      <rect
        x={13}
        y={22}
        width={2}
        style={{ opacity: 0.4 }}
        height={6}
        rx={1}
        transform='rotate(-180 13 22)'
        fill='currentColor'
      />
      <rect
        x={5.63603}
        y={19.7782}
        width={2}
        style={{ opacity: 0.6 }}
        height={6}
        rx={1}
        transform='rotate(-135 5.636 19.778)'
        fill='currentColor'
      />
      <rect
        x={2}
        y={13}
        width={2}
        style={{ opacity: 0.8 }}
        height={6}
        rx={1}
        transform='rotate(-90 2 13)'
        fill='currentColor'
      />
      <rect
        x={4.22183}
        y={5.63603}
        width={2}
        height={6}
        rx={1}
        transform='rotate(-45 4.222 5.636)'
        fill='currentColor'
      />
    </svg>
  );
}

export { Spinner, SpinnerButton };
