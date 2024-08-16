import { AnimatePresence, motion } from 'framer-motion';
import { FastForward, Play, SkipBack, SkipForward } from 'lucide-react';
import { useEffect, useState } from 'react';

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

  const currentTime = 22; // seconds
  const totalDuration = 173; // seconds (2:53)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  };

  return (
    <>
      <div className='flex flex-col justify-center'>
        <AnimatePresence>
          {activeAlbum && (
            <div className='absolute inset-0 flex flex-col items-center justify-center z-10'>
              <motion.div
                layoutId={`card-${activeAlbum.title}`}
                className='flex h-fit cursor-pointer flex-col justify-center items-center gap-4 overflow-hidden p-4'
                style={{ borderRadius: 12 }}
              >
                <motion.img
                  layoutId={`image-${activeAlbum.title}`}
                  height={300}
                  width={300}
                  alt='Album'
                  src={activeAlbum.image}
                  style={{ borderRadius: 24 }}
                />
                <div className='flex  w-full px-4'>
                  <div className='flex flex-col gap-1'>
                    <div className='flex w-full'>
                      <motion.p
                        layoutId={`title-${activeAlbum.title}`}
                        className='text-xl font-semibold text-white'
                      >
                        {activeAlbum.title}
                      </motion.p>
                    </div>
                    <div className='flex flex-col'>
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
              <div className='flex w-[300px] h-fit justify-center cursor-pointer flex-col gap-4 overflow-hidden px-4'>
                <motion.div
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className='flex flex-col items-center w-full'
                >
                  <div className='w-full mt-2'>
                    <div className='bg-gray-600 rounded-md h-0.5 relative'>
                      <div
                        className='bg-white rounded-md h-0.5'
                        style={{
                          width: `${(currentTime / totalDuration) * 100}%`,
                        }}
                      ></div>
                      <div
                        className='absolute bg-white rounded-full w-3 h-3'
                        style={{
                          left: `${(currentTime / totalDuration) * 100}%`,
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      ></div>
                    </div>
                    <div className='flex justify-between text-zinc-400 text-xs font-normal leading-3 mt-2'>
                      <div>{formatTime(currentTime)}</div>
                      <div>{formatTime(totalDuration)}</div>
                    </div>
                  </div>

                  <div className='flex flex-col w-full items-center bg-black rounded-2xl'>
                    <div className='flex w-full justify-center items-center'>
                      <div className='w-full flex justify-between items-center mt-4'>
                        <FastForward
                          className='transform rotate-180 text-gray-500 w-6 h-6 cursor-pointer'
                          fill='gray'
                        />
                        <SkipBack
                          fill='white'
                          className='text-white w-6 h-6 cursor-pointer'
                        />
                        <div className='bg-white p-3 rounded-full'>
                          <Play
                            fill='black'
                            className='text-white w-8 h-8 cursor-pointer'
                          />
                        </div>

                        <SkipForward
                          fill='white'
                          className='text-white w-6 h-6 cursor-pointer'
                        />
                        <FastForward
                          className='text-gray-500 w-6 h-6 cursor-pointer'
                          fill='gray'
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
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
                    className='text-sm font-semibold text-gray-400'
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
