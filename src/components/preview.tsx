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

import { registry } from '@/registry';
import { RegistryEntry } from '@/registry/schema';

export const Preview: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const uiComponents: RegistryEntry[] = Object.entries(registry)
    .filter(([_, value]) => value.type === 'components:ui')
    .map(([_, value]) => ({
      ...value,
    }));

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextStep = () => {
    if (index < uiComponents.length - 1) {
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

  const Preview = React.useMemo(() => {
    const Component = uiComponents[index].component;

    if (!Component) {
      return (
        <p className='text-sm text-muted-foreground'>
          Component{' '}
          <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm'>
            {uiComponents[index].name}
          </code>{' '}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [index, uiComponents]);

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
                <SelectValue placeholder={uiComponents[0].name}>
                  {mounted ? uiComponents[index].name : uiComponents[0].name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Animations</SelectLabel>
                  {uiComponents.map((component, i) => {
                    return (
                      <SelectItem key={i} value={i.toString()}>
                        {component.name}
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
                disabled={index === uiComponents.length - 1}
              >
                <Icons.ChevronRight className='h-5 w-5' />
                <span className='sr-only'>Next</span>
              </Button>
            </div>
          </div>
        </div>
        <div className='relative h-[360px] w-full overflow-hidden'>
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
              className='absolute inset-0 flex items-center justify-center z-50'
            >
              {Preview}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='text-zinc-400 text-sm font-normal leading-tight'>
            {uiComponents[index].name}
          </div>
          <Button asChild variant='outline'>
            <Link href={`/docs/components/${uiComponents[index].name}`}>
              <Icons.Code className='mr-2 h-5 w-5' strokeWidth={1.8} /> View
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
