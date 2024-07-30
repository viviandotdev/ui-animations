'use client';
import React from 'react';

import { SpinnerButton } from '@/registry/core/ui/spinner-button';

export const SpinnerButtonDemo: React.FC = () => {
  return (
    <SpinnerButton className='rounded-lg font-medium text-sm h-8 w-[172px] overflow-hidden bg-gradient-to-b from-[#1994ff] to-[#157cff] shadow-[0_0_1px_1px_rgba(255,255,255,0.08)_inset,0_1px_1.5px_0_rgba(0,0,0,0.32),0_0_0_0.5px_#1a94ff] relative text-white' />
  );
};
export default SpinnerButtonDemo;
