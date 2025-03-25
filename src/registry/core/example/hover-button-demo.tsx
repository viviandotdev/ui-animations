import { motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';

interface HoverButtonProps {}

export const HoverButton: React.FC<HoverButtonProps> = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className='flex items-center justify-center px-8 py-2.5 bg-[#1c1c1c] text-white rounded-xl relative border border-[#2a2a2a] transition-colors'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='relative gap-2 flex items-center px-8 py-2 justify-center w-full'>
        <motion.span
          className='absolute text-[15px] font-medium'
          animate={{
            x: isHovered ? -8 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 17,
            mass: 0.8,
          }}
        >
          Follow
        </motion.span>
        <motion.span
          className='absolute'
          initial={{ opacity: 0, x: 28 }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <PlusIcon size={16} />
        </motion.span>
      </div>
    </motion.button>
  );
};

export default HoverButton;
