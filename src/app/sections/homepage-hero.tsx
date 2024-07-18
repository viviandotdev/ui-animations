import * as React from 'react';
import '@/lib/env';

import Hero, { HeroSubtitle, HeroTitle } from '@/components/hero';
import { Button, Highlight } from '@/components/ui/button';
import Emoji from '@/components/ui/emoji';
import { Icons } from '@/components/ui/icons';
export default function HomepageHero() {
  return (
    <Hero>
      <Button
        className='rounded-full translate-y-[-1rem] animate-fade-in opacity-0'
        variant='secondary'
        href='/'
        size='small'
      >
        <Emoji label='sparkles' symbol='✨' />{' '}
        <span className='ml-2'>New: Introducing Animated Dock </span>
        <Highlight>→</Highlight>
      </Button>
      <HeroTitle className='animate-fade-in translate-y-[-1rem] opacity-0'>
        Beautiful Animated
        <br className='hidden md:block' /> UI Components
      </HeroTitle>
      <HeroSubtitle className='animate-fade-in [--animation-delay:200ms] translate-y-[-1rem] opacity-0'>
        A collection of free, customizable, and ready to use animated UI
        <br className='hidden md:block' /> components for modern web
        applications.
      </HeroSubtitle>
      <div className='flex gap-2 justify-center animate-fade-in [--animation-delay:600ms] translate-y-[-1rem] opacity-0'>
        <Button
          className='hover:bg-white border hover:border-white hover:shadow-[0_0_16px_rgba(255,255,255,0.5)] transition duration-500 ease-in-out shadow-none'
          href='/'
          variant='primary'
          size='large'
        >
          Browse Components
          <Highlight>
            <Icons.Chevron />
          </Highlight>
        </Button>
      </div>
    </Hero>
  );
}
