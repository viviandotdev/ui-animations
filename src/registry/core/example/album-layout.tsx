import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

interface Album {
  title: string;
  description: string;
  longDescription: string;
  image: string;
}

export default function SharedLayout() {
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveAlbum(null);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <div className='flex flex-col'>
        <AnimatePresence>
          {activeAlbum && (
            <div className='absolute inset-0 grid place-items-center z-10'>
              <motion.div
                layoutId={`card-${activeAlbum.title}`}
                className='flex h-fit cursor-pointer flex-col gap-4 overflow-hidden p-4'
                style={{ borderRadius: 12 }}
              >
                <motion.img
                  layoutId={`image-${activeAlbum.title}`}
                  height={300}
                  width={300}
                  alt='Album'
                  src={activeAlbum.image}
                  className='mx-auto p-4'
                  style={{ borderRadius: 24 }}
                />
                <div className='flex items-center justify-between w-full'>
                  <div className='flex flex-col items-start gap-1'>
                    <div className='flex w-full justify-between'>
                      <motion.p
                        layoutId={`title-${activeAlbum.title}`}
                        className='text-xl font-semibold text-white'
                      >
                        {activeAlbum.title}
                      </motion.p>
                    </div>
                    <div className='flex flex-col text-left'>
                      <motion.p
                        layoutId={`description-${activeAlbum.description}`}
                        className='text-base font-medium text-gray-400'
                      >
                        {activeAlbum.description}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className='flex flex-col w-full'
              >
                <Button variant='secondary' className='h-8 text-xs w-full'>
                  Add to Cart
                </Button>
                <Button variant='secondary' className='h-8 text-xs w-full mt-2'>
                  BUY
                </Button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <ul className='relative flex w-full flex-col items-center p-0 my-12'>
        {GAMES.map((game) => (
          <motion.li
            layoutId={`card-${game.title}`}
            key={game.title}
            onClick={() => setActiveAlbum(game)}
            className='flex flex-col w-96 cursor-pointer items-center gap-2 p-0 rounded-lg'
          >
            <motion.img
              layoutId={`image-${game.title}`}
              style={{ borderRadius: 12 }}
              height={180}
              width={180}
              alt='Album'
              src={game.image}
            />
            <div className='flex flex-grow items-center justify-between border-b border-gray-200 last:border-none'>
              <div className='flex flex-col items-center gap-1 '>
                <div className='flex flex-col'>
                  <motion.p
                    layoutId={`title-${game.title}`}
                    className='text-base font-semibold text-white'
                  >
                    {game.title}
                  </motion.p>
                </div>
                <div className='flex flex-col '>
                  <motion.p
                    layoutId={`description-${game.description}`}
                    className='text-sm font-semibold text-white'
                  >
                    {game.description}
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

const GAMES = [
  {
    title: 'Billie Ellish',
    description: 'THE GREATEST',
    longDescription: 'The song',
    image: 'https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62',
  },
];
