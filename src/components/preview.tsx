'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { COMPONENTS_CONFIG } from '@/constant/components.config';

export const Preview: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const components = Object.entries(COMPONENTS_CONFIG).map(
    ([key, value], index) => ({
      id: index,
      slug: key,
      ...value,
    }),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextStep = () => {
    if (index < components.length - 1) {
      setDirection(1);
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevStep = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const variants = {
    initial: (direction: number) => {
      return {
        x: `${110 * direction}%`,
        opacity: 0,
      };
    },
    active: { x: '0%', opacity: 1 },
    exit: (direction: number) => {
      return {
        x: `${-110 * direction}%`,
        opacity: 0,
      };
    },
  };

  return (
    <div className='flex justify-center items-center bg-white/opacity-0 rounded-2xl shadow border dark:border-zinc-800 p-4'>
      <div className='flex flex-col justify-end items-start gap-4 bg-[#F8F8F8] dark:bg-[#242424] rounded-xl dark:shadow dark:border dark:border-zinc-800 p-6 w-full h-full'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex justify-between items-center w-full'>
            <Select
              value={mounted ? index.toString() : undefined}
              onValueChange={(value: string) => setIndex(parseInt(value))}
            >
              <SelectTrigger className='w-fit gap-2'>
                <SelectValue placeholder={components[0].title}>
                  {mounted ? components[index].title : components[0].title}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Animations</SelectLabel>
                  {components.map((component, i) => {
                    return (
                      <SelectItem key={i} value={i.toString()}>
                        {component.title}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className='opacity-50 flex justify-center items-center' />
            <div className='flex justify-start items-center gap-3.5'>
              <Button
                onClick={prevStep}
                variant='outline'
                size='icon'
                disabled={index === 0}
              >
                <Icons.ChevronLeft className='h-5 w-5' />
                <span className='sr-only'>Prev</span>
              </Button>
              <Button
                onClick={nextStep}
                variant='outline'
                size='icon'
                disabled={index === components.length - 1}
              >
                <Icons.ChevronRight className='h-5 w-5' />
                <span className='sr-only'>Next</span>
              </Button>
            </div>
          </div>
        </div>
        <div className='relative h-[350px] w-full overflow-hidden'>
          <AnimatePresence mode='popLayout' initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial='initial'
              animate='active'
              exit='exit'
              transition={{
                x: {
                  type: 'spring',
                  bounce: 0,
                  duration: 0.8,
                },
              }}
              className='absolute inset-0 flex items-center justify-center'
            >
              {React.cloneElement(components[index].preview)}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='text-zinc-400 text-sm font-normal leading-tight'>
            {components[index].title}
          </div>
          <Button asChild variant='outline'>
            <Link href={`/docs/components/${components[index].slug}`}>
              <Icons.Code className='mr-2 h-5 w-5' strokeWidth={1.8} /> View
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
