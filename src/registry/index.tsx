import React from 'react';

import { Registry } from '@/registry/schema';

const ui: Registry = {
  'animated-tabs': {
    name: 'animated-tabs',
    type: 'components:ui',
    files: ['src/registry/core/ui/animated-tabs.tsx'],
  },
  'magnified-dock': {
    name: 'linear-gradient',
    type: 'components:ui',
    files: ['src/registry/core/ui/magnified-dock.tsx'],
  },
};

const example: Registry = {
  'magnified-dock-demo': {
    name: 'magnified-dock-demo',
    type: 'components:example',
    files: ['src/registry/core/example/magnified-dock-demo.tsx'],
    component: React.lazy(
      () => import('@/registry/core/example/magnified-dock-demo'),
    ),
  },
  'animated-tabs-demo': {
    name: 'animated-tabs-demo',
    type: 'components:example',
    files: ['src/registry/core/example/animated-tabs-demo.tsx'],
    component: React.lazy(
      () => import('@/registry/core/example/animated-tabs-demo'),
    ),
  },
};

export const registry: Registry = {
  ...ui,
  ...example,
};
