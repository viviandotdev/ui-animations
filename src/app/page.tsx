import classNames from 'classnames';
import * as React from 'react';
import '@/lib/env';

import { Container } from '@/components/container';
import HomepageHero from '@/components/homepage-hero';
export default function Homepage() {
  return (
    <>
      <div className='overflow-hidden max-w-5xl mx-auto pb-[16.4rem] md:pb-[25.6rem] dark:bg-black'>
        <Container className='py-[4.4rem] '>
          <HomepageHero />
        </Container>
      </div>
      <div className={classNames('relative h-[60rem] overflow-hidden')}></div>
    </>
  );
}
