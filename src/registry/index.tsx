import React from 'react';

import { Registry } from '@/registry/schema';
// Component Source
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

// Component Preview
const example: Registry = {
  'magnified-dock-demo': {
    name: 'magnified-dock-demo',
    type: 'components:example',
    files: ['src/registry/core/ui/magnified-dock.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/magnified-dock-demo'), //demo file
    ),
  },
  'animated-tabs-demo': {
    name: 'animated-tabs-demo',
    type: 'components:example',
    files: ['src/registry/core/ui/animated-tabs.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/animated-tabs-demo'), //demo file
    ),
  },
};

export const registry: Registry = {
  ...ui,
  ...example,
};
