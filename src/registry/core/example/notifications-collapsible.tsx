import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosNotifications } from 'react-icons/io';

function Collapsible() {
  const notifications = [
    {
      title: 'New Message',
      message: 'You have received a new message from John Doe.',
    },
    {
      title: 'Meeting Reminder',
      message: 'Your team meeting starts in 15 minutes.',
    },
    {
      title: 'Update Available',
      message: 'A new software update is available for your app.',
    },
    {
      title: 'Friend Request',
      message: 'Jane Smith sent you a friend request.',
    },
  ];

  return (
    <div className='App'>
      <NotificationComponent notifications={notifications} />
      {/* Rest of your app */}
    </div>
  );
}

export default Collapsible;

const NotificationComponent = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className=' w-80 bg-white rounded-lg shadow-lg overflow-hidden'
      >
        <div className='bg-blue-500 px-4 py-2 flex justify-between items-center'>
          <div className='flex items-center text-white'>
            <IoIosNotifications className='mr-2' />
            <h3 className='font-semibold'>
              Notifications ({notifications.length})
            </h3>
          </div>
          <div className='flex items-center'>
            <button
              onClick={toggleOpen}
              className='text-white mr-2 focus:outline-none'
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <IoIosArrowDown />
              </motion.div>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
              className='overflow-hidden'
            >
              <ul className='divide-y divide-gray-200'>
                {notifications.map((notification, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='px-4 py-3 hover:bg-gray-50'
                  >
                    <h4 className='font-medium text-gray-800'>
                      {notification.title}
                    </h4>
                    <p className='text-sm text-gray-600'>
                      {notification.message}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
