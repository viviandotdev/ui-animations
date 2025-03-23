'use client';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface CarouselProps {}

const images = [
  'https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1628367282397-bf7cb7d6e4b3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMzA5OTc1fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8MTMwOTk3NXx8ZW58MHx8fHx8',
];
const Carousel: React.FC<CarouselProps> = () => {
  const [current, setCurrent] = useState(0);
  const [aspectRatio, setAspectRatio] = useState('16/9'); // default aspect ratio

  useEffect(() => {
    // Get the dimensions of the first image to set the aspect ratio
    const img = new window.Image();
    img.src = images[0];
    img.onload = () => {
      setAspectRatio(`${img.width}/${img.height}`);
    };
  }, []);

  const onPrevClick = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const onNextClick = () => {
    if (current < images.length - 1) {
      setCurrent(current + 1);
    }
  };

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft' && current > 0) {
        setCurrent(current - 1);
      } else if (e.key === 'ArrowRight' && current < images.length - 1) {
        setCurrent(current + 1);
      }
    }
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [current]);

  return (
    <main className='px-10 animate-fade-in flex w-full flex-col items-center'>
      <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.7 }}>
        <div
          className='relative mx-auto w-full overflow-hidden'
          style={{ aspectRatio: aspectRatio }}
        >
          <motion.div
            className='flex h-full gap-4 w-full'
            animate={{ x: `calc(-${current * 100}% - ${current}rem)` }}
          >
            {images.map((image, i) => (
              <div
                key={`image-${i}`}
                className='relative h-full w-full shrink-0'
              >
                <Image
                  src={image}
                  alt={`Image ${i + 1}`}
                  fill
                  className='rounded-md object-contain'
                  priority={i === 0}
                />
              </div>
            ))}
          </motion.div>

          {/* Navigation Arrows */}
          <AnimatePresence initial={false}>
            {current > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0, pointerEvents: 'none' }}
                whileHover={{ opacity: 0.8 }}
                className='pointer-events absolute top-1/2 left-2 z-20 -mt-4 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#c2c2c3]/80 text-white backdrop-blur-xs transition-all sm:h-8 sm:w-8'
                onClick={onPrevClick}
              >
                <ChevronLeftIcon className='h-4 w-4 sm:h-6 sm:w-6' />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {current + 1 < images.length && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0, pointerEvents: 'none' }}
                whileHover={{ opacity: 0.8 }}
                className='pointer-events absolute top-1/2 right-2 z-20 -mt-4 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#c2c2c3]/80 text-white backdrop-blur-xs transition-all sm:h-8 sm:w-8'
                onClick={onNextClick}
              >
                <ChevronRightIcon className='h-4 w-4 sm:h-6 sm:w-6' />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Control Pills */}
          <div className='absolute right-0 bottom-2 left-0 flex justify-center sm:bottom-4'>
            <div className='flex rounded-full bg-[#c2c2c3]/40 px-1.5 py-1.5 backdrop-blur-xs sm:px-2 sm:py-2'>
              {[...images].map((_, idx) => (
                <button
                  className='cursor-pointer px-0.5 sm:px-1'
                  key={idx}
                  onClick={() => setCurrent(idx)}
                >
                  <div
                    className={`h-1.5 w-1.5 rounded-full transition-all sm:h-2 sm:w-2 ${
                      idx === current ? 'bg-white' : 'bg-gray-400/80'
                    }`}
                  ></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </MotionConfig>
    </main>
  );
};

export default Carousel;
