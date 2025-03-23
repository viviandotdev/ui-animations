'use client';

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
}

function LinkButton({ href, children }: LinkButtonProps) {
  return (
    <Link
      href={href}
      target='_blank'
      className='group/link flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1 text-sm font-medium whitespace-nowrap text-gray-700 shadow-sm'
    >
      <div>{children}</div>
      <div className='flex items-center transition-transform duration-500 group-hover/link:-rotate-45'>
        <ArrowRightIcon className='mt-0.5 items-center stroke-gray-600' />
      </div>
    </Link>
  );
}

export default LinkButton;
