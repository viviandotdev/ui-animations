import { useState } from 'react';

import {
  ResizablePanel,
  ResizablePanelContent,
} from '@/registry/core/ui/resizable-panel';

export default function ResizablePanelComponent() {
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
  }

  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='relative overflow-hidden rounded-lg bg-white text-neutral-900 shadow'>
        <div className='px-8 pt-8'>
          <p className='text-lg'>Reset password</p>
        </div>
        <ResizablePanel value={status}>
          <ResizablePanelContent value='idle'>
            <form onSubmit={handleSubmit} className='p-8'>
              <p className='text-sm text-neutral-400'>
                Enter your email to reset your password:
              </p>
              <div className='mt-3'>
                <input
                  className='block w-full rounded border-neutral-200 text-neutral-800 shadow-sm'
                  type='email'
                  required
                  defaultValue='sam@buildui.com'
                />
              </div>
              <div className='mt-8 text-right'>
                <button
                  type='submit'
                  className='rounded-full cursor-pointer bg-blue-500 px-5 py-2 text-sm font-medium text-white'
                >
                  Email me my link
                </button>
              </div>
            </form>
          </ResizablePanelContent>
          <ResizablePanelContent value='success'>
            <p className='p-8 text-sm text-neutral-400'>
              Email sent! Check your inbox to continue.
            </p>
          </ResizablePanelContent>
        </ResizablePanel>
      </div>
    </div>
  );
}
