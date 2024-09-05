import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
interface CarouselProps {}

const images = [
  'https://images.unsplash.com/photo-1725267385461-cab515fc1bbe?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1593642634367-d91a135587b5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const Carousel: React.FC<CarouselProps> = ({}) => {
  let [index, setIndex] = useState(0);

  return (
    <div className='h-full bg-black'>
      <div className='mx-auto flex h-full max-w-7xl flex-col justify-center'>
        <div className='relative'>
          <img src={images[index]} className='aspect-[3/2] object-cover' />

          {index > 0 && (
            <button
              className='absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition hover:bg-white/80'
              onClick={() => setIndex(index - 1)}
            >
              <ChevronLeftIcon className='h-6 w-6' />
            </button>
          )}

          {index + 1 < images.length && (
            <button
              className='absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition hover:bg-white/80'
              onClick={() => setIndex(index + 1)}
            >
              <ChevronRightIcon className='h-6 w-6' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
