'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { motion } from 'framer-motion';

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const MotionCollapsibleContent = motion(
  CollapsiblePrimitive.CollapsibleContent,
);

const CollapsibleContent = ({ ...props }) => (
  <MotionCollapsibleContent
    forceMount
    initial={{ height: 0 }}
    animate={{ height: 'auto' }}
    exit={{ height: 0 }}
    transition={{ duration: 0.3 }}
    {...props}
  />
);

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
