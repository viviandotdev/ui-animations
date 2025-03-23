'use client';
import Link from 'next/link';
import React from 'react';

import { Container } from '@/components/container';
import { ModeToggle } from '@/components/mode-toggle';

export const Header = () => {
  return (
    <header className='z-20 fixed top-0 left-0 w-full border-b dark:border-transparent-white backdrop-blur-[12px]'>
      <Container className='flex h-navigation-height '>
        <Link className='flex items-center text-md' href='/'>
          {/* <Logo className='mr-4 h-[1.8rem] w-[1.8rem]' /> */}
          UI Animations
        </Link>
        <div className='ml-auto flex gap-2 h-full items-center'>
          {/* <Link className='mr-6 text-sm' href='#'>
            Log in
          </Link>
          <Button asChild variant='primary'>
            <Link href='#'>Sign up</Link>
          </Button> */}
          <ModeToggle />
        </div>
      </Container>
    </header>
  );
};
export default Header;
