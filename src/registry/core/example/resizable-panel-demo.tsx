import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { useState } from 'react';
import { createContext } from 'react';
import useMeasure from 'react-use-measure';

const transition = { type: 'ease', ease: 'easeInOut', duration: 0.4 };

export default function ResizablePanelComponent() {
  const [status, setStatus] = useState('idle');
  const [ref, bounds] = useMeasure();
  return (
    <MotionConfig transition={transition}>
      <div className='mx-auto w-full max-w-md'>
        <div className='relative overflow-hidden rounded-lg bg-white text-neutral-900 shadow'>
          <div className='px-8 pt-8'>
            <p className='text-lg'>Reset password</p>
          </div>
          <motion.div
            animate={{ height: bounds.height > 0 ? bounds.height : undefined }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.7 }}
          >
            <div ref={ref}>
              <AnimatePresence mode='popLayout'>
                {status === 'idle' || status === 'saving' ? (
                  <motion.div
                    exit={{ opacity: 0 }}
                    transition={{
                      ...transition,
                      duration: transition.duration / 2,
                    }}
                    key='form'
                  >
                    <Form
                      onSubmit={async () => await delay(1000)}
                      afterSave={() => setStatus('success')}
                      className='p-8'
                    >
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
                        {/* <Form.Button className='rounded-full bg-blue-500 px-5 py-2 text-sm font-medium text-white '></Form.Button> */}
                      </div>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      ...transition,
                      duration: transition.duration / 2,
                      delay: transition.duration / 2,
                    }}
                  >
                    <p className='p-8 text-sm text-neutral-400'>
                      Email sent! Check your inbox to continue.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}

const formContext = createContext({
  status: 'idle',
});

function Form({ onSubmit, afterSave, children, ...props }) {
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('saving');
    await onSubmit();
    setStatus('success');
    // await delay(1250);
    afterSave();
  }

  return (
    <formContext.Provider value={{ status }}>
      <form onSubmit={handleSubmit} {...props}>
        <fieldset disabled={status !== 'idle'}>{children}</fieldset>
      </form>
    </formContext.Provider>
  );
}

async function delay(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
