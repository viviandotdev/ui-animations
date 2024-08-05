'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { ButtonHTMLAttributes, Dispatch, SetStateAction } from 'react';

type ButtonStatus = 'idle' | 'loading' | 'success';

interface ButtonCopy {
  idle: React.ReactNode | string;
  loading: React.ReactNode;
  success: React.ReactNode | string;
}

interface StatusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonCopy: ButtonCopy;
  status: ButtonStatus;
  setStatus: Dispatch<SetStateAction<ButtonStatus>>;
}

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function StatusButton({
  className,
  buttonCopy,
  status,
  setStatus,
  ...props
}: StatusButtonProps) {
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!disabled) {
      setStatus('loading');
      await wait(1500);
      setStatus('success');
      await wait(3000);
      setStatus('idle');
    }
  };

  const disabled = status !== 'idle';

  return (
    <button
      type='submit'
      disabled={disabled}
      className={`${className} relative transition flex items-center justify-center duration-200`}
      onClick={handleSubmit}
      {...props}
    >
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.span
          key={status}
          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          initial={{ y: -25, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: 25, opacity: 0 }}
        >
          {status === 'loading' ? buttonCopy.loading : buttonCopy[status]}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default StatusButton;
