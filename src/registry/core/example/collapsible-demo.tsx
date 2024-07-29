'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  Calendar,
  ChevronDown,
  Download,
  MessageCircle,
} from 'lucide-react';
import React, { useId, useState } from 'react';

import {
  Collapsible as CollapsibleComponent,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/registry/core/ui/collapsible';

const notifications = [
  {
    id: 1,
    title: 'New message',
    content: 'You have a new message from John Doe',
    icon: MessageCircle,
  },
  {
    id: 2,
    title: 'Meeting reminder',
    content: 'Team meeting in 15 minutes',
    icon: Calendar,
  },
  {
    id: 3,
    title: 'Update available',
    content: 'New app version is ready to install',
    icon: Download,
  },
];

const CollapsibleDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  return (
    <AnimatePresence key={id}>
      <CollapsibleComponent
        open={isOpen}
        onOpenChange={setIsOpen}
        className='w-[420px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-xl shadow-md overflow-hidden'
      >
        <CollapsibleTrigger className='w-full'>
          <div className='px-4 py-4 flex justify-between items-center'>
            <div className='flex items-center gap-4'>
              <div className='flex relative overflow-hidden cursor-pointer border p-2 aspect-square items-center justify-center rounded-md w-12 bg-gray-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'>
                <div className='relative overflow-hidden'>
                  <Bell className='shadow-md stroke-zinc-500 dark:stroke-zinc-400 stroke-2' />
                </div>
              </div>
              <div className='flex flex-col items-start'>
                <h3 className='font-semibold text-black dark:text-white'>
                  Notifications
                </h3>
                <p className='text-sm text-zinc-600 dark:text-zinc-400 truncate'>
                  You have {notifications.length} unread notifications
                </p>
              </div>
            </div>
            <div className='flex items-center bg-zinc-400 dark:bg-zinc-600 p-1 rounded-full'>
              <motion.div
                className='text-white focus:outline-none'
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </div>
          </div>
        </CollapsibleTrigger>
        <AnimatePresence>
          {isOpen && (
            <CollapsibleContent className='overflow-hidden border-t border-zinc-200 dark:border-zinc-700'>
              <ul className='divide-y divide-zinc-200 dark:divide-zinc-700'>
                {notifications.map((notification) => (
                  <motion.li
                    key={notification.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='px-4 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  >
                    <div className='flex gap-4'>
                      <div className='flex cursor-pointer border p-2 aspect-square items-center justify-center rounded-md w-12 bg-gray-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'>
                        <div className='relative overflow-hidden'>
                          <notification.icon className='shadow-md stroke-zinc-500 dark:stroke-zinc-400 stroke-2' />
                        </div>
                      </div>
                      <div>
                        <h4 className='font-medium text-left text-zinc-800 dark:text-zinc-200'>
                          {notification.title}
                        </h4>
                        <p className='text-sm text-zinc-600 text-left dark:text-zinc-400 truncate'>
                          {notification.content}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </CollapsibleComponent>
    </AnimatePresence>
  );
};

export default CollapsibleDemo;
