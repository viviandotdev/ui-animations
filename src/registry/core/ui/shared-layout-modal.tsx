import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Employee {
  name: string;
  employeeId: string;
  role: string;
  email: string;
  phoneNumber: string;
  department: string;
  status: string;
  image: string;
}

export default function SharedLayout() {
  const [activeEmployee, setActiveEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveEmployee(null);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {activeEmployee ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 z-10 bg-black bg-opacity-20'
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {activeEmployee ? (
          <div className='absolute inset-0 grid place-items-center z-10'>
            <motion.div
              layoutId={`card-${activeEmployee.name}`}
              className='flex h-fit w-[500px] cursor-pointer flex-col items-start gap-4 overflow-hidden p-4 rounded-lg dark:bg-black dark:border dark:border-gray-800 dark:text-white bg-white text-black'
            >
              <div className='flex items-center gap-4 w-full'>
                <motion.div layoutId={`image-${activeEmployee.name}`}>
                  <Image
                    height={56}
                    width={56}
                    alt='Employee'
                    src={activeEmployee.image}
                    style={{ borderRadius: 12 }}
                  />
                </motion.div>

                <div className='flex grow items-center justify-between'>
                  <div className='flex flex-col pr-4 p-0'>
                    <motion.h2
                      layoutId={`name-${activeEmployee.name}`}
                      className='text-sm font-medium'
                    >
                      {activeEmployee.name}
                    </motion.h2>
                    <motion.p
                      layoutId={`employeeId-${activeEmployee.employeeId}`}
                      className='text-sm text-gray-500 dark:text-gray-400'
                    >
                      {activeEmployee.employeeId}
                    </motion.p>
                  </div>
                  <motion.button
                    layoutId={`button-${activeEmployee.name}`}
                    className='text-sm font-medium'
                  >
                    {activeEmployee.role}
                  </motion.button>
                </div>
              </div>
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className='text-sm w-full border-t mb-2 px-2'
              >
                <div className='grid grid-cols-2 grid-rows-2 gap-4 mt-4'>
                  <div>
                    <div className='text-gray-500'>Email Address</div>
                    <div className='font-normal'>{activeEmployee.email}</div>
                  </div>
                  <div>
                    <div className='text-gray-500'>Phone Number</div>
                    <div className='font-normal'>
                      {activeEmployee.phoneNumber}
                    </div>
                  </div>
                  <div>
                    <div className='text-gray-500'>Department</div>
                    <div className='font-normal'>
                      {activeEmployee.department}
                    </div>
                  </div>
                  <div>
                    <div className='text-gray-500'>Status</div>
                    <div className='font-normal'>{activeEmployee.status}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className='relative flex w-full flex-col items-center p-0 my-12'>
        {EMPLOYEES.map((employee) => (
          <motion.li
            layoutId={`card-${employee.name}`}
            key={employee.name}
            onClick={() => setActiveEmployee(employee)}
            className='flex w-96 cursor-pointer items-center gap-4 px-4 py-2 '
          >
            <motion.div layoutId={`image-${employee.name}`}>
              <Image
                height={56}
                width={56}
                alt='Employee'
                style={{ borderRadius: 12 }}
                src={employee.image}
              />
            </motion.div>
            <div className='flex flex-grow items-center justify-between border-b border-gray-200 dark:border-gray-700 last:border-none'>
              <div className='flex flex-col py-4'>
                <motion.h2
                  layoutId={`name-${employee.name}`}
                  className='text-sm font-medium'
                >
                  {employee.name}
                </motion.h2>
                <motion.p
                  layoutId={`employeeId-${employee.employeeId}`}
                  className='text-sm text-gray-500 dark:text-gray-400'
                >
                  {employee.employeeId}
                </motion.p>
              </div>
              <motion.button
                layoutId={`button-${employee.name}`}
                className='text-sm font-medium'
              >
                {employee.role}
              </motion.button>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

const EMPLOYEES = [
  {
    name: 'John Doe',
    employeeId: 'WPD230501',
    role: 'Sr UI/UX Designer',
    email: 'john.doe@example.com',
    phoneNumber: '+1-234-567-8901',
    department: 'Engineering',
    status: 'Active',
    image: '/memoji/memoji-1.png',
  },
  {
    name: 'Jane Smith',
    employeeId: 'ZSK230503',
    role: 'Software Engineer',
    email: 'jane.smith@example.com',
    phoneNumber: '+1-234-567-8902',
    department: 'Engineering',
    status: 'Active',
    image: '/memoji/memoji-2.png',
  },
  {
    name: 'Emma Thompson',
    employeeId: 'CZQ230505',
    role: 'Product Manager',
    email: 'emma.thompson@example.com',
    phoneNumber: '+1-234-567-8903',
    department: 'Product',
    status: 'Active',
    image: '/memoji/memoji-3.png',
  },
];
