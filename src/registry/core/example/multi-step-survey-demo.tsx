'use client';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import { MultiStepComponent } from '@/registry/core/ui/multi-step-component';

const MultiStepComponentDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedRating, setSelectedRating] = useState(null);
  const [feedbackContent, setFeedbackContent] = useState('');

  const steps = [
    {
      header: {
        title: 'How would you rate this app?',
        description:
          'How satisfied are you with our app, please rate your experience.',
      },
      content: (
        <RateExperience
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />
      ),
    },
    {
      header: {
        title: "What's your overall experience?",
        description:
          'Please share your thoughts on your experience with this app.',
      },
      content: (
        <Feedback
          feedbackContent={feedbackContent}
          onFeedbackChange={(e) => setFeedbackContent(e.target.value)}
        />
      ),
    },
  ];

  const [isAnimating, setIsAnimating] = useState(false);

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
    <div className='relative max-w-[420px] overflow-hidden rounded-xl border shadow'>
      <MultiStepComponent
        transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
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
        currentStep={currentStep}
        direction={direction}
        onAnimationComplete={handleAnimationComplete}
      >
        {steps.map((step, index) => (
          <div key={index}>
            <header className='mb-4 space-y-2'>
              <h2 className='text-xl font-bold text-black dark:text-white'>
                {step.header.title}
              </h2>
              <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                {step.header.description}
              </p>
            </header>
            {step.content}
          </div>
        ))}
      </MultiStepComponent>
      <div className='p-6 flex gap-2 justify-between'>
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

export default MultiStepComponentDemo;

export const RateExperience = ({
  selectedRating,
  setSelectedRating,
}: {
  selectedRating: number | null;
  setSelectedRating: React.Dispatch<React.SetStateAction<null>>;
}) => (
  <div className='flex w-full flex-col items-center gap-3'>
    <div className='mb-3 flex w-full justify-between'>
      {['😠', '😟', '😐', '😊', '😆'].map((emoji, index) => (
        <button
          key={index}
          className={cn(
            'flex h-[60px] w-[60px] items-center justify-center rounded-lg border-[1px] shadow-md transition-all duration-200 ease-in-out',
            'bg-white dark:bg-black dark:border',
            selectedRating === index
              ? 'dark:border-white border-gray-900 dark:border-[2px] border-[2px]'
              : 'hover:-translate-y-1',
          )}
          onClick={() => setSelectedRating(index)}
        >
          <span
            className={cn(
              'text-3xl transition-transform duration-200',
              selectedRating === index && 'scale-105',
            )}
          >
            {emoji}
          </span>
        </button>
      ))}
    </div>
  </div>
);

const Feedback = ({
  feedbackContent,
  onFeedbackChange,
}: {
  feedbackContent: string;
  onFeedbackChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div className='flex w-full flex-col items-center gap-4'>
    <textarea
      rows={6}
      value={feedbackContent}
      onChange={onFeedbackChange}
      placeholder='Tell us about your experience here...'
      className={cn(
        'placeholder:text-muted-foreground min-h-[60px] w-full rounded-md border px-3 py-2 text-sm',
        'focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50',
        'focus:shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]',
        'transition-all duration-200 ease-in-out',
      )}
    />
    <div className='flex w-full gap-2'></div>
  </div>
);
