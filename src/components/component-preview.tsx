'use client';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { useTabs } from '@/hooks/use-tabs';

import ComponentWrapper from '@/components/component-wrapper';
import { CopyButton } from '@/components/copy-button';
import { Icons } from '@/components/icons';

import { registry } from '@/registry';

const transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.15,
};

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  align?: 'center' | 'start' | 'end';
}

export function ComponentPreview({
  name,
  children,
  className,
  align = 'center',
  ...props
}: ComponentPreviewProps) {
  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[0];

  const codeString = React.useMemo(() => {
    if (typeof Code?.props['data-rehype-pretty-code-figure'] !== 'undefined') {
      const [Button] = React.Children.toArray(
        Code.props.children,
      ) as React.ReactElement[];
      return Button?.props?.value || Button?.props?.__rawString__ || null;
    }
  }, [Code]);

  const Preview = React.useMemo(() => {
    const Component = registry[name]?.component;

    if (!Component) {
      return (
        <p className='text-sm text-muted-foreground'>
          Component{' '}
          <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm'>
            {name}
          </code>{' '}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  const tabs = [
    {
      label: 'Preview',
      children: (
        <div className='relative border rounded-xl'>
          <div className='absolute right-4 top-4'>
            <CopyButton
              value={codeString}
              variant='outline'
              className='h-7 w-7 text-foreground opacity-100 hover:bg-muted hover:text-foreground [&_svg]:h-3.5 [&_svg]:w-3.5'
            />
          </div>
          <ComponentWrapper>
            <div
              className={cn(
                'preview flex min-h-[250px] w-full justify-center ',
                {
                  'items-center': align === 'center',
                  'items-start': align === 'start',
                  'items-end': align === 'end',
                },
              )}
            >
              <React.Suspense
                fallback={
                  <div className='flex items-center text-sm text-muted-foreground'>
                    <Icons.Spinner className='mr-2 h-4 w-4 animate-spin' />
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </div>
          </ComponentWrapper>
        </div>
      ),
      id: 'preview',
    },
    {
      label: 'Code',
      children: (
        <div className='flex p-[1px] flex-col space-y-4'>
          <div className='w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[410px] [&_pre]:overflow-auto'>
            {Code}
          </div>
        </div>
      ),
      id: 'code',
    },
  ];

  const [hookProps] = useState({
    tabs: tabs,
    initialTabId: 'preview',
  });
  const framer = useTabs(hookProps);
  const { selectedTabIndex, setSelectedTab } = framer.tabProps;

  return (
    <div
      className={cn('group relative my-4 flex flex-col space-y-2', className)}
      {...props}
    >
      <div className='pb-3'>
        <motion.nav className='relative z-0 flex flex-shrink-0 items-center justify-start border-b py-2'>
          <LayoutGroup id={tabs + name}>
            {tabs.map((item, i) => {
              return (
                <motion.button
                  key={item.label}
                  className={cn(
                    'text-md relative text-muted-foreground font-semibold flex h-7 cursor-pointer select-none items-center justify-center rounded-md px-4 text-sm transition-colors',
                    {
                      'text-primary': selectedTabIndex === i,
                    },
                  )}
                  onClick={() => {
                    setSelectedTab([i, i > selectedTabIndex ? 1 : -1]);
                  }}
                >
                  <span className='z-20'>{item.label}</span>

                  <AnimatePresence>
                    {i === selectedTabIndex ? (
                      <motion.div
                        key='underline'
                        transition={transition}
                        layoutId='underline'
                        className={cn(
                          'absolute bottom-[-9.5px] left-0 right-0 z-10 mr-0 border-b-2 border-primary',
                        )}
                      />
                    ) : null}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </LayoutGroup>
        </motion.nav>
      </div>
      <div className='flex flex-col rounded-xl'>
        {/* <div></div> */}
        {framer.selectedTab.children}
      </div>
    </div>
  );
}
