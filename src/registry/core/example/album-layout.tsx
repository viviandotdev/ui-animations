import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Example() {
  const [activeAlbum, setActiveAlbum] = useState<null | string>(null);
  // const containerRef = useRef<HTMLDivElement>(null);

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
    <div className='grid place-items-center'>
      <AnimatePresence mode='popLayout'>
        {activeAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key='large'
            layoutId={`card-${'album'}`}
            onClick={() => setActiveAlbum(null)}
            className='flex flex-col items-center justify-center'
          >
            <motion.div layoutId='image-album'>
              <Image
                className='rounded-xl w-[300px] '
                alt='album-cover'
                height={300}
                width={300}
                src='https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62'
              />
            </motion.div>

            <div className='flex flex-col gap-1 px-1 text-left w-full'>
              <motion.h2
                layoutId='title-album'
                className='text-lg font-semibold'
              >
                HIT ME HARD AND SOFT
              </motion.h2>
              <motion.p
                layoutId='description-album'
                className='text-base text-gray-600'
              >
                Billie Ellish
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <button className='px-2 bg-red-200'>play button</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layoutId={`card-${'album'}`}
        key='small'
        onClick={() => setActiveAlbum('album')}
      >
        <motion.div layoutId='image-album'>
          <Image
            className='rounded-xl w-[160px] '
            alt='album-cover'
            height={160}
            width={160}
            src='https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62'
          />
        </motion.div>

        <div className='flex-grow text-left px-2 mt-2'>
          <motion.h2 layoutId='title-album' className='text-xs font-semibold'>
            HIT ME HARD AND SOFT
          </motion.h2>
          <motion.p
            layoutId='description-album'
            className='text-sm text-gray-600'
          >
            Billie Ellish
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

// import { AnimatePresence, motion } from 'framer-motion';
// import Image from 'next/image';
// import React, { useEffect, useRef, useState } from 'react';

// interface AlbumCardProps {}

// export const AlbumCard: React.FC<AlbumCardProps> = ({}) => {
//   const [activeAlbum, setActiveAlbum] = useState<null | string>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function onKeyDown(event: KeyboardEvent) {
//       if (event.key === 'Escape') {
//         setActiveAlbum(null);
//       }
//     }

//     window.addEventListener('keydown', onKeyDown);
//     return () => window.removeEventListener('keydown', onKeyDown);
//   }, []);

//   return (
//     <>
//       <AnimatePresence>
//         {activeAlbum ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className='flex items-center justify-center bg-black bg-opacity-50'
//           >
//             <motion.div
//               ref={containerRef}
//               layoutId={`card-${'album'}`}
//               transition={{
//                 layout: {
//                   duration: 0.5,
//                   type: 'spring',
//                   bounce: 0,
//                 },
//               }}
//               onClick={(e) => e.stopPropagation()}
//               className='flex flex-col rounded-xl gap-2 text-base text-gray-100 cursor-pointer bg-white'
//             >
//               <motion.div layoutId='image-album'>
//                 <Image
//                   className='rounded-xl w-[300px] '
//                   alt='album-cover'
//                   height={300}
//                   width={300}
//                   src={
//                     'https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62'
//                   }
//                 />
//               </motion.div>

//               <div className='flex flex-col gap-1 px-1'>
//                 <motion.div layoutId={`title-${'album'}`} className='text-sm'>
//                   HIT ME HARD AND SOFT
//                 </motion.div>
//                 <motion.div
//                   layoutId={`artist-${'album'}`}
//                   className='text-xs opacity-80'
//                 >
//                   Billie Ellish
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         ) : (
//           <motion.div
//             layoutId={`card-${'album'}`}
//             key={'album'}
//             onClick={() => setActiveAlbum('album')}
//             className='flex items-center justify-center bg-black bg-opacity-50'
//           >
//             <motion.div className='flex flex-col rounded-xl gap-2 text-base text-gray-100 cursor-pointer bg-white'>
//               <motion.div layoutId={`image-album`}>
//                 <Image
//                   className='rounded-xl'
//                   alt='album-cover'
//                   height={180}
//                   width={180}
//                   src={
//                     'https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62'
//                   }
//                 />
//               </motion.div>

//               <div className='flex flex-col gap-1 px-1'>
//                 <motion.div layoutId={`title-${'album'}`} className='text-sm'>
//                   HIT ME HARD AND SOFT
//                 </motion.div>
//                 <motion.div
//                   layoutId={`artist-${'album'}`}
//                   className='text-xs opacity-80'
//                 >
//                   Billie Ellish
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };
// export default AlbumCard;
