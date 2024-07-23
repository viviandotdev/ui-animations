'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';

import ComponentWrapper from '@/components/component-wrapper';
import { CopyButton } from '@/components/copy-button';
import { Icons } from '@/components/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { registry } from '@/registry';

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

  return (
    <div
      className={cn('group relative my-4 flex flex-col space-y-2', className)}
      {...props}
    >
      <Tabs defaultValue='preview' className='relative mr-auto w-full'>
        <div className='flex items-center justify-between pb-3'>
          <TabsList className='w-full justify-start rounded-none border-b bg-transparent p-0'>
            <TabsTrigger
              value='preview'
              className='relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value='code'
              className='relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='preview' className='relative rounded-md border'>
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
                'preview flex min-h-[250px] w-full justify-center p-10',
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
        </TabsContent>
        <TabsContent value='code'>
          <div className='flex flex-col space-y-4'>
            <div className='w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[410px] [&_pre]:overflow-auto'>
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
