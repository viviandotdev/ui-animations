import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface Contact {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  email: string;
  phone: string;
  location: string;
}

export default function SharedLayout() {
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveContact(null);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {activeContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'
            onClick={() => setActiveContact(null)}
          >
            <motion.div
              ref={containerRef}
              layoutId={`card-${activeContact.title}`}
              transition={{
                layout: {
                  duration: 0.5,
                  type: 'spring',
                  bounce: 0,
                },
              }}
              className='inner bg-white rounded-xl p-6 w-[480px] max-w-[90%] max-h-[90vh] overflow-y-auto'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex items-start gap-4 mb-4'>
                <motion.div layoutId={`image-${activeContact.title}`}>
                  <Image
                    height={56}
                    width={56}
                    alt='Contact'
                    src={activeContact.image}
                    className='rounded-full h-[56px]'
                  />
                </motion.div>

                <div className='flex-grow'>
                  <motion.h2
                    layoutId={`title-${activeContact.title}`}
                    className='text-xl font-bold mb-1'
                  >
                    {activeContact.title}
                  </motion.h2>
                  <motion.p
                    layoutId={`description-${activeContact.title}`}
                    className='text-sm text-gray-600'
                  >
                    {activeContact.description}
                  </motion.p>
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className='text-sm text-gray-700 mb-4'
              >
                {activeContact.longDescription}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className='text-sm text-gray-700'
              >
                <p className='mb-2'>
                  <strong>Email:</strong> {activeContact.email}
                </p>
                <p className='mb-2'>
                  <strong>Phone:</strong> {activeContact.phone}
                </p>
                <p>
                  <strong>Location:</strong> {activeContact.location}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ul className='relative flex w-full flex-col items-center p-0 my-12'>
        {CONTACTS.map((contact) => (
          <motion.li
            layoutId={`card-${contact.title}`}
            key={contact.title}
            onClick={() => setActiveContact(contact)}
            className='flex w-[386px] cursor-pointer items-center gap-4 p-4 hover:bg-gray-100 rounded-lg'
          >
            <motion.div layoutId={`image-${contact.title}`}>
              <Image
                height={56}
                width={56}
                alt='Contact'
                src={contact.image}
                className='rounded-full h-[56px]'
              />
            </motion.div>

            <div className='flex-grow'>
              <motion.h2
                layoutId={`title-${contact.title}`}
                className='text-lg font-semibold'
              >
                {contact.title}
              </motion.h2>
              <motion.p
                layoutId={`description-${contact.title}`}
                className='text-sm text-gray-600'
              >
                {contact.description}
              </motion.p>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

const CONTACTS = [
  {
    title: 'John Doe',
    description: 'Software Engineer at TechCorp',
    longDescription:
      'John has over 10 years of experience in the tech industry, specializing in software development and project management. He is currently leading a team of developers at TechCorp, where they work on innovative software solutions.',
    image:
      'https://webgradients.com/public/webgradients_png/001%20Warm%20Flame.png',
    email: 'john.doe@techcorp.com',
    phone: '+1 (555) 555-1234',
    location: 'San Francisco, CA, USA',
  },
  {
    title: 'Jane Smith',
    description: 'Marketing Manager at MarketGenius',
    longDescription:
      'Jane is a seasoned marketing professional with a knack for creating compelling campaigns. At MarketGenius, she leads the marketing team, driving brand awareness and customer engagement through strategic initiatives.',
    image:
      'https://webgradients.com/public/webgradients_png/009%20Frozen%20Dreams.png',
    email: 'jane.smith@marketgenius.com',
    phone: '+1 (555) 555-5678',
    location: 'New York, NY, USA',
  },
  {
    title: 'Emily Johnson',
    description: 'UX Designer at DesignStudio',
    longDescription:
      'Emily is a talented UX designer with an eye for detail. She has worked on numerous high-profile projects, helping to create user-friendly and aesthetically pleasing designs. She is currently with DesignStudio, where she continues to push the boundaries of UX design.',
    image:
      'https://webgradients.com/public/webgradients_png/014%20Amy%20Crisp.png',
    email: 'emily.johnson@designstudio.com',
    phone: '+1 (555) 555-9876',
    location: 'Los Angeles, CA, USA',
  },
];
