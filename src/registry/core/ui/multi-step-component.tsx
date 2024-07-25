import {
  AnimatePresence,
  motion,
  MotionConfig,
  MotionProps,
  Transition,
  Variant,
} from 'framer-motion';
import React, { ReactElement } from 'react';
import useMeasure from 'react-use-measure';

type MultiStepComponentProps = {
  children: ReactElement[];
  currentStep: number;
  direction: number;
  variants?: { initial: Variant; active: Variant; exit: Variant };
  transition?: Transition;
} & MotionProps;

export const MultiStepComponent: React.FC<MultiStepComponentProps> = ({
  children,
  currentStep,
  direction,
  variants,
  transition,
  ...motionProps
}) => {
  const [ref, bounds] = useMeasure();

  return (
    <MotionConfig transition={transition}>
      <motion.div
        animate={{ height: bounds.height }}
        className='relative overflow-hidden'
      >
        <div className='px-6 pt-6' ref={ref}>
          <AnimatePresence mode='popLayout' initial={false} custom={direction}>
            <motion.div
              key={currentStep}
              variants={variants}
              initial='initial'
              animate='active'
              exit='exit'
              custom={direction}
              {...motionProps}
            >
              {children[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </MotionConfig>
  );
};
