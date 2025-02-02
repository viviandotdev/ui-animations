import { CircleDashed, Mail } from 'lucide-react';
import { useState } from 'react';

import {
  ResizablePanel,
  ResizablePanelContent,
} from '@/registry/core/ui/resizable-panel';
import StatusButton from '@/registry/core/ui/status-button';

type ButtonStatus = 'idle' | 'loading' | 'success';

export default function ResizablePanelDemo() {
  const [status, setStatus] = useState<ButtonStatus>('idle');

  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='relative overflow-hidden rounded-lg bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'>
        <div className='flex flex-col gap-2 px-8 pt-8 text-left '>
          <div className='w-14 h-14 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg shadow border border-zinc-200 dark:border-zinc-800 flex items-center justify-center'>
            <div className='w-6 h-6'>
              <Mail className='w-6 h-6 text-zinc-900 dark:text-zinc-100' />
            </div>
          </div>

          <h2 className='text-2xl font-semibold text-zinc-900 dark:text-zinc-50'>
            Newsletter
          </h2>
          <p className='text-sm text-zinc-500 dark:text-zinc-400'>
            Subscribe to our weekly newsletter for exclusive content directly
            into your inbox
          </p>
        </div>
        <ResizablePanel
          transition={{ type: 'spring', bounce: 0.3, duration: 0.7 }}
          value={status}
        >
          <ResizablePanelContent values={['idle', 'loading']}>
            <form className='px-8 pb-8 pt-6'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-1.5'>
                  <label
                    htmlFor='email'
                    className='text-left  text-sm font-medium text-zinc-900 dark:text-zinc-200'
                  >
                    Email
                  </label>
                  <div className='relative'>
                    <input
                      type='email'
                      id='email'
                      placeholder='Email Address'
                      className='w-full pl-10 pr-3 py-2 text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
                    />
                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500' />
                  </div>
                </div>

                <div className='flex justify-end'>
                  <StatusButton
                    status={status}
                    setStatus={setStatus}
                    className='px-4 py-3 w-full text-sm font-medium text-zinc-100 bg-zinc-900 dark:text-zinc-900 dark:bg-zinc-100 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
                    buttonCopy={{
                      idle: (
                        <div className='flex items-center gap-2'>Subscribe</div>
                      ),
                      loading: (
                        <CircleDashed className='h-4 w-4 animate-spin' />
                      ),
                      success: <></>,
                    }}
                  />
                </div>
              </div>
            </form>
          </ResizablePanelContent>
          <ResizablePanelContent values={['success']}>
            <p className='p-8 text-sm text-zinc-500 dark:text-zinc-300'>
              You're on the list, thanks for subscribing!
            </p>
          </ResizablePanelContent>
        </ResizablePanel>
      </div>
    </div>
  );
}
