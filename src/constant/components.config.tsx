import React, { ReactElement } from 'react';

import AnimatedTabs from '@/components/previews/animated-tabs';
import MagnifiedDock from '@/components/previews/magnified-dock';

import {
  ANIMATED_TABS_CODE,
  MAGNIFIED_DOCK_CODE,
} from '@/constant/code.config';

export interface ComponentConfig {
  title: string;
  description?: React.ReactNode;
  subtitle: string;
  preview: ReactElement;
  code: string;
  tags: string[];
  resourceLinks: Array<{
    name: string;
    url: string;
  }>;
}

export const COMPONENTS_CONFIG: Record<string, ComponentConfig> = {
  'magnified-dock': {
    title: 'macOS Magnified Dock',
    subtitle: 'Interactive dock with magnification effect',
    preview: <MagnifiedDock />,
    code: MAGNIFIED_DOCK_CODE,
    description: (
      <div className='text-sm text-zinc-800'>
        The dock icons enlarge when hovered over, creating a fluid and
        interactive user experience similar to the original macOS dock.
      </div>
    ),
    tags: ['react', 'framer-motion', 'tailwindcss', 'shadcn-ui'],
    resourceLinks: [
      {
        name: 'buildui.com',
        url: 'https://buildui.com/recipes/magnified-dock',
      },
      {
        name: 'rauno.me',
        url: 'https://rauno.me/',
      },
      {
        name: 'codesandbox.io',
        url: 'https://codesandbox.io/s/distracted-ganguly-cjyy4l?file=/src/App.tsx',
      },
    ],
  },
  'animated-tabs': {
    title: 'Animated Navigation Tabs',
    subtitle: 'Smooth and interactive tab navigation',
    preview: <AnimatedTabs />,
    code: ANIMATED_TABS_CODE,
    tags: ['react', 'framer-motion', 'tailwindcss'],
    resourceLinks: [
      {
        name: 'joshuawootonn.com',
        url: 'https://www.joshuawootonn.com/vercel-tabs-component#the-delta-between-framer-motion-and-react-spring',
      },
      {
        name: 'buildui.com',
        url: 'https://buildui.com/recipes/animated-tabs',
      },
    ],
  },
};
