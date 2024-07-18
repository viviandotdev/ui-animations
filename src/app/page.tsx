import classNames from 'classnames';
import * as React from 'react';
import '@/lib/env';

import { Container } from '@/components/container';

import HomepageHero from '@/app/sections/homepage-hero';
export default function Homepage() {
  return (
    <>
      <div className='overflow-hidden pb-[16.4rem] md:pb-[25.6rem] bg-page-gradient'>
        <Container className='py-[6.4rem] '>
          <HomepageHero />
        </Container>
      </div>
      <div
        className={classNames(
          'z-[-1] relative my-[-12.8rem] h-[60rem] overflow-hidden',
        )}
      ></div>
    </>
  );
}
