import React from 'react';

import Dock from '@/components/previews/magnified-dock';
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

export const Preview: React.FC = () => {
  return (
    <div className='flex justify-center items-center bg-white/opacity-0 rounded-2xl shadow border dark:border-zinc-800 p-4'>
      <div className='flex flex-col justify-end items-start gap-4 bg-[#F8F8F8] dark:bg-[#242424] rounded-xl dark:shadow dark:border dark:border-zinc-800 p-6 w-full h-full'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex justify-between items-center w-full'>
            <Select>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a animation' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Animations</SelectLabel>
                  <SelectItem value='magnified-dock'>Magnified Dock</SelectItem>
                  <SelectItem value='banana'>Banana</SelectItem>
                  <SelectItem value='blueberry'>Blueberry</SelectItem>
                  <SelectItem value='grapes'>Grapes</SelectItem>
                  <SelectItem value='pineapple'>Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className='opacity-50 flex justify-center items-center' />
            <div className='flex justify-start items-center gap-3.5'>
              <Button variant='outline' size='icon'>
                <Icons.ChevronLeft className='h-5 w-5' />
                <span className='sr-only'>Prev</span>
              </Button>
              <Button variant='outline' size='icon'>
                <Icons.ChevronRight className='h-5 w-5' />
                <span className='sr-only'>Next</span>
              </Button>
            </div>
          </div>
        </div>
        <div className='flex h-[350px] w-full items-center justify-center'>
          <Dock />
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='text-zinc-400 text-sm font-normal leading-tight'>
            Magnified Dock
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
