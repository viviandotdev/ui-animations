import Link from 'next/link';
import * as React from 'react';
import '@/lib/env';

import { cn } from '@/lib/utils';

import { Container } from '@/components/container';
import Hero, { HeroSubtitle, HeroTitle } from '@/components/hero';
import { Icons } from '@/components/icons';
import Preview from '@/components/preview';
import { Button, Highlight } from '@/components/ui/button';
import Emoji from '@/components/ui/emoji';

export default function HomepageHero() {
  return (
    <Hero>
      <Button
        variant={null}
        className={cn(
          'border backdrop-filter-[12px] transition duration-300 hover:shadow-[inset_0_-7px_11px_#cccccc1f] ease-in',
          'rounded-full translate-y-[-1rem] animate-fade-in opacity-0',
          'dark:border-transparent-white dark:text-off-white dark:bg-white dark:bg-opacity-10',
          'text-gray-400 bg-opacity-0 border-gray-200',
          '[&_.highlight]:bg-transparent-white [&_.highlight]:rounded-full [&_.highlight]:px-2 [&_.highlight:last-child]:ml-2 [&_.highlight:last-child]:-mr-2 [&_.highlight:first-child]:-ml-2 [&_.highlight:first-child]:mr-2',
        )}
        size='sm'
        asChild
      >
        <Link href='/docs/components/magnified-dock'>
          <Emoji label='sparkles' symbol='✨' />{' '}
          <span className='ml-2'>New: Introducing Magnified Dock </span>
          <Highlight>→</Highlight>
        </Link>
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
          className={cn(
            'dark:hover:bg-white dark:hover:border-white dark:hover:shadow-[0_0_16px_rgba(255,255,255,0.5)]',
            'hover:shadow-lg dark:hover:border-black',
            'text-base rounded-md border transition duration-500 ease-in-out shadow-none',
          )}
          variant='primary'
          size='lg'
          asChild
        >
          <Link href='/docs/components/animated-tabs'>
            Browse Components
            <Highlight>
              <Icons.ChevronRight />
            </Highlight>
          </Link>
        </Button>
      </div>
      <Container className='mt-16 px-6 md:px-12'>
        <Preview />
      </Container>
    </Hero>
  );
}
