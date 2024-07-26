'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import AnimatedCheck from '@/registry/core/ui/animated-check';
import { MultiStepComponent } from '@/registry/core/ui/multi-step-component';

const MultiStepWizardDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      content: (
        <div className='w-full space-y-4'>
          <Skeleton className='h-8 w-3/4 rounded-lg' />
          <Skeleton className='h-24 w-full rounded-lg' />
          <Skeleton className='h-10 w-1/2 rounded-lg' />
        </div>
      ),
    },
    {
      content: (
        <div className='w-full space-y-4'>
          <Skeleton className='h-6 w-full rounded-lg' />
          <Skeleton className='h-32 w-full rounded-lg' />
          <Skeleton className='h-10 w-2/3 rounded-lg' />
        </div>
      ),
    },
    {
      content: (
        <div className='w-full space-y-4'>
          <Skeleton className='h-10 w-1/2 rounded-lg' />
          <Skeleton className='h-20 w-full rounded-lg' />
          <Skeleton className='h-16 w-3/4 rounded-lg' />
        </div>
      ),
    },
    {
      content: (
        <div className='w-full space-y-4'>
          <Skeleton className='h-8 w-2/3 rounded-lg' />
          <Skeleton className='h-28 w-full rounded-lg' />
        </div>
      ),
    },
    {
      content: (
        <div className='w-full space-y-4'>
          <Skeleton className='h-12 w-full rounded-lg' />
          <Skeleton className='h-36 w-full rounded-lg' />
          <Skeleton className='h-8 w-1/2 rounded-lg' />
        </div>
      ),
    },
  ];
  const handleNext = () => {
    if (currentStep < steps.length - 1 && !isAnimating) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
      setIsAnimating(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0 && !isAnimating) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
      setIsAnimating(true);
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <div className='relative w-full max-w-[420px] overflow-hidden rounded-xl border shadow'>
      <div className='flex justify-between rounded px-8 pt-8'>
        <Step step={0} currentStep={currentStep} />
        <Step step={1} currentStep={currentStep} />
        <Step step={2} currentStep={currentStep} />
        <Step step={3} currentStep={currentStep} />
      </div>

      <MultiStepComponent
        currentStep={currentStep}
        direction={direction}
        transition={{ duration: 0.7, type: 'spring', bounce: 0 }}
        variants={{
          initial: (direction: number) => ({
            x: `${110 * direction}%`,
            opacity: 0,
          }),
          active: { x: '0%', opacity: 1 },
          exit: (direction: number) => ({
            x: `${-110 * direction}%`,
            opacity: 0,
          }),
        }}
        onAnimationComplete={handleAnimationComplete}
      >
        {steps.map((step, index) => (
          <div key={index} className='w-full'>
            {step.content}
          </div>
        ))}
      </MultiStepComponent>
      <div className='px-6 py-8 flex gap-2 justify-between'>
        <Button
          disabled={currentStep === 0}
          onClick={handlePrev}
          className='shadow'
          variant='outline'
        >
          Back
        </Button>
        <Button
          disabled={currentStep === steps.length - 1}
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MultiStepWizardDemo;

function Step({ step, currentStep }: { step: number; currentStep: number }) {
  const status =
    currentStep === step
      ? 'active'
      : currentStep < step
        ? 'inactive'
        : 'complete';

  return (
    <motion.div animate={status} className='relative'>
      <motion.div
        variants={{
          active: {
            scale: 1,
            transition: {
              delay: 0,
              duration: 0.2,
            },
          },
          complete: {
            scale: 1.25,
          },
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          type: 'tween',
          ease: 'circOut',
        }}
        className='absolute inset-0 rounded-full bg-blue-200'
      />

      <motion.div
        initial={false}
        variants={{
          inactive: {
            backgroundColor: '#fff', // neutral
            borderColor: '#e5e5e5', // neutral-200
            color: '#a3a3a3', // neutral-400
          },
          active: {
            backgroundColor: '#fff',
            borderColor: '#3b82f6', // blue-500
            color: '#3b82f6', // blue-500
          },
          complete: {
            backgroundColor: '#3b82f6', // blue-500
            borderColor: '#3b82f6', // blue-500
            color: '#3b82f6', // blue-500
          },
        }}
        transition={{ duration: 0.2 }}
        className='relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold'
      >
        <div className='flex items-center justify-center'>
          <IconWrapper>
            <AnimatedCheck
              delay={0.2}
              isChecked={status === 'complete'}
              className='h-6 w-6 text-white'
            />
          </IconWrapper>
          <IconWrapper>
            {status !== 'complete' && <span>{step + 1}</span>}
          </IconWrapper>
        </div>
      </motion.div>
    </motion.div>
  );
}

const IconWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
    {children}
  </div>
);

const Skeleton = ({ className, ...props }: { className: string }) => (
  <div
    className={cn('bg-neutral-200 dark:bg-neutral-800', className)}
    {...props}
  />
);
