'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ComponentProps, createContext, ReactNode, useContext } from 'react';
import useMeasure from 'react-use-measure';

const PanelContext = createContext({ value: '' });

interface ResizablePanelProps extends ComponentProps<'div'> {
  children: ReactNode;
  value: string;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  value,
  ...rest
}) => {
  const [ref, bounds] = useMeasure();

  return (
    <motion.div
      animate={{ height: bounds.height > 0 ? bounds.height : undefined }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.7 }}
      style={{ overflow: 'hidden', position: 'relative' }}
    >
      <div ref={ref}>
        <PanelContext.Provider value={{ value }}>
          <div {...rest}>{children}</div>
        </PanelContext.Provider>
      </div>
    </motion.div>
  );
};

interface ResizablePanelContentProps extends ComponentProps<'div'> {
  values: string[];
  children: ReactNode;
}

const transition = {
  type: 'ease',
  ease: 'easeInOut',
  duration: 0.4,
};

const ResizablePanelContent: React.FC<ResizablePanelContentProps> = ({
  values,
  children,
  ...rest
}) => {
  const panelContext = useContext(PanelContext);
  const isActive = values.includes(panelContext.value);

  return (
    <AnimatePresence mode='popLayout' initial={false}>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              ...transition,
              duration: transition.duration / 2,
              delay: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              ...transition,
              duration: transition.duration / 2,
            },
          }}
        >
          <div {...rest}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { ResizablePanel, ResizablePanelContent };
