'use client';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
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
  const [mounted, setMounted] = useState(false);
  const components = Object.entries(COMPONENTS_CONFIG).map(
    ([_, value], index) => ({
      id: index,
      ...value,
    }),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextVariant = () => {
    setIndex((prevIndex) => (prevIndex + 1) % components.length);
  };

  const prevVariant = () => {
    setIndex(
      (prevIndex) => (prevIndex + components.length - 1) % components.length,
    );
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
              <Button onClick={prevVariant} variant='outline' size='icon'>
                <Icons.ChevronLeft className='h-5 w-5' />
                <span className='sr-only'>Prev</span>
              </Button>
              <Button onClick={nextVariant} variant='outline' size='icon'>
                <Icons.ChevronRight className='h-5 w-5' />
                <span className='sr-only'>Next</span>
              </Button>
            </div>
          </div>
        </div>
        <div className='flex h-[350px] w-full items-center justify-center'>
          {React.cloneElement(components[index].preview)}
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='text-zinc-400 text-sm font-normal leading-tight'>
            {components[index].title}
          </div>
          <Button variant='outline'>
            <Icons.Code className='mr-2 h-5 w-5' strokeWidth={1.8} /> View
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Preview;
