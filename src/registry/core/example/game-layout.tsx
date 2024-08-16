import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Game {
  title: string;
  description: string;
  longDescription: string;
  image: string;
}

export default function SharedLayout() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveGame(null);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  return (
    <>
      <AnimatePresence>
        {activeGame ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='overlay'
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {activeGame ? (
          <div className='absolute inset-0 grid place-items-center z-10'>
            <motion.div
              layoutId={`card-${activeGame.title}`}
              className='flex h-fit w-[500px] cursor-pointer flex-col items-start gap-4 overflow-hidden bg-white p-4 '
              style={{ borderRadius: 12 }}
            >
              <div className='flex items-center gap-4 w-full'>
                <motion.img
                  layoutId={`image-${activeGame.title}`}
                  height={56}
                  width={56}
                  alt='Game'
                  src={activeGame.image}
                  style={{ borderRadius: 12 }}
                />
                <div className='flex grow items-center justify-between'>
                  <div className='flex flex-col pr-4 p-0'>
                    <motion.h2
                      layoutId={`title-${activeGame.title}`}
                      className='text-sm font-medium'
                    >
                      {activeGame.title}
                    </motion.h2>
                    <motion.p
                      layoutId={`description-${activeGame.title}`}
                      className='text-sm text-gray-500'
                    >
                      {activeGame.description}
                    </motion.p>
                  </div>
                  <motion.button
                    layoutId={`button-${activeGame.title}`}
                    className='rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-blue-500'
                  >
                    Get
                  </motion.button>
                </div>
              </div>
              <motion.p
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 6 }}
                className='text-sm text-gray-500'
              >
                {activeGame.longDescription}
              </motion.p>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className='relative flex w-full flex-col items-center p-0 my-12'>
        {GAMES.map((game) => (
          <motion.li
            layoutId={`card-${game.title}`}
            key={game.title}
            onClick={() => setActiveGame(game)}
            className='flex w-96 cursor-pointer items-center gap-4 p-0 rounded-lg'
          >
            <motion.img
              layoutId={`image-${game.title}`}
              className='h-14 w-14 rounded-xl'
              alt='Game'
              src={game.image}
            />
            <div className='flex flex-grow items-center justify-between border-b border-gray-200 last:border-none'>
              <div className='flex flex-col py-4'>
                <motion.h2
                  layoutId={`title-${game.title}`}
                  className='text-sm font-medium'
                >
                  {game.title}
                </motion.h2>
                <motion.p
                  layoutId={`description-${game.title}`}
                  className='text-sm text-gray-500'
                >
                  {game.description}
                </motion.p>
              </div>
              <motion.button
                layoutId={`button-${game.title}`}
                className='rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-blue-500'
              >
                Get
              </motion.button>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

const GAMES = [
  {
    title: 'The Oddysey',
    description: 'Explore unknown galaxies.',
    longDescription:
      'Throughout their journey, players will encounter diverse alien races, each with their own unique cultures and technologies. Engage in thrilling space combat, negotiate complex diplomatic relations, and make critical decisions that affect the balance of power in the galaxy.',
    image:
      'https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/space.png',
  },
  {
    title: 'Angry Rabbits',
    description: 'They are coming for you.',
    longDescription:
      'The rabbits are angry and they are coming for you. You have to defend yourself with your carrot gun. The game is not simple, you have to be fast and accurate to survive.',
    image:
      'https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/rabbit.png',
  },
  {
    title: 'Ghost town',
    description: 'Find the ghosts.',
    longDescription:
      'You are in a ghost town and you have to find the ghosts. But be careful, they are dangerous.',
    image:
      'https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/ghost.webp',
  },
  {
    title: 'Pirates in the jungle',
    description: 'Find the treasure.',
    longDescription:
      'You are a pirate and you have to find the treasure in the jungle. But be careful, there are traps and wild animals.',
    image:
      'https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/pirate.png',
  },

  {
    title: 'Lost in the mountains',
    description: 'Find your way home.',
    longDescription:
      'You are lost in the mountains and you have to find your way home. But be careful, there are dangerous animals and you can get lost.',
    image:
      'https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/boy.webp',
  },
];
