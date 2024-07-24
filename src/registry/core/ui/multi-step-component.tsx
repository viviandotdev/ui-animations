'use client';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import React, { useCallback, useMemo, useState } from 'react';
import useMeasure from 'react-use-measure';

import { cn } from '@/lib/utils';

const SurveyHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <header className='mb-4 space-y-2'>
    <h2 className='text-xl font-bold text-black dark:text-white'>{title}</h2>
    <p className='text-sm text-zinc-500 dark:text-zinc-400'>{description}</p>
  </header>
);

const SurveyButton = ({
  onClick,
  children,
  variant = 'primary',
}: {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) => (
  <button
    className={cn(
      'flex h-10 w-full items-center justify-center rounded-lg border font-medium px-3 py-1.5 shadow-md transition-colors duration-200',
      variant === 'primary'
        ? 'bg-black text-white dark:bg-white dark:text-black'
        : 'bg-white text-black dark:bg-black dark:text-white',
    )}
    onClick={onClick}
  >
    <span className='flex items-center gap-0.5 text-sm'>{children}</span>
  </button>
);

const RateExperience = ({
  selectedRating,
  onRatingClick,
  onNext,
}: {
  selectedRating: number | null;
  onRatingClick: (rating: number) => void;
  onNext: () => void;
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
          onClick={() => onRatingClick(index)}
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
    <SurveyButton onClick={onNext}>Next</SurveyButton>
  </div>
);

const Feedback = ({
  feedbackContent,
  onFeedbackChange,
  onPrev,
  onSubmit,
}: {
  feedbackContent: string;
  onFeedbackChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPrev: () => void;
  onSubmit: () => void;
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
    <div className='flex w-full gap-2'>
      <SurveyButton variant='secondary' onClick={onPrev}>
        Back
      </SurveyButton>
      <SurveyButton onClick={onSubmit}>Submit</SurveyButton>
    </div>
  </div>
);

const SURVEY_CONFIG = [
  {
    title: 'How would you rate this app?',
    description:
      'How satisfied are you with our app, please rate your experience.',
    component: RateExperience,
  },
  {
    title: "What's your overall experience?",
    description: 'Please share your thoughts on your experience with this app.',
    component: Feedback,
  },
];

export const MultiStepSurvey: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [ref, bounds] = useMeasure();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedbackContent, setFeedbackContent] = useState('');

  const handleNext = () => {
    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(() => {
    console.log('Feedback submitted:', {
      rating: selectedRating,
      feedback: feedbackContent,
    });
  }, [selectedRating, feedbackContent]);
  const content = useMemo(() => {
    const {
      title,
      description,
      component: StepComponent,
    } = SURVEY_CONFIG[currentStep];
    return (
      <>
        <SurveyHeader title={title} description={description} />
        <StepComponent
          selectedRating={selectedRating}
          onRatingClick={setSelectedRating}
          onNext={handleNext}
          feedbackContent={feedbackContent}
          onFeedbackChange={(e) => setFeedbackContent(e.target.value)}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
        />
      </>
    );
  }, [currentStep, selectedRating, feedbackContent, handlePrev, handleSubmit]);

  return (
    <MotionConfig transition={{ duration: 0.7, type: 'spring', bounce: 0 }}>
      <motion.div
        animate={{ height: bounds.height }}
        className='relative max-w-[420px] overflow-hidden rounded-xl border shadow'
      >
        <div className='p-6' ref={ref}>
          <AnimatePresence mode='popLayout' initial={false} custom={direction}>
            <motion.div
              key={currentStep}
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
              initial='initial'
              animate='active'
              exit='exit'
              custom={direction}
            >
              {content}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </MotionConfig>
  );
};

export default MultiStepSurvey;
