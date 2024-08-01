'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { ButtonHTMLAttributes, useState } from 'react';

type ButtonStatus = 'idle' | 'loading' | 'success';

interface ButtonCopy {
  idle: React.ReactNode | string;
  loading: React.ReactNode;
  success: React.ReactNode | string;
}

interface StatusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonCopy: ButtonCopy;
  onSubmit: () => Promise<void>;
}

function StatusButton({
  className,
  buttonCopy,
  onSubmit,
  ...rest
}: StatusButtonProps) {
  const [status, setStatus] = useState<ButtonStatus>('idle');

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await onSubmit();
      setStatus('success');
      setTimeout(() => setStatus('idle'), 1750);
    } catch (error) {
      setStatus('idle');
      // Handle error if needed
    }
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
          {status === 'loading' ? buttonCopy.loading : buttonCopy[status]}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default StatusButton;
