import React from 'react';

import { Registry } from '@/registry/schema';

const ui: Registry = {
  'animated-tabs': {
    name: 'animated-tabs',
    type: 'components:ui',
    files: ['src/registry/core/ui/animated-tabs.tsx'],
    component: React.lazy(() => import('@/registry/core/ui/animated-tabs')),
  },
  'magnified-dock': {
    name: 'magnified-dock',
    type: 'components:ui',
    files: ['src/registry/core/ui/magnified-dock.tsx'],
    component: React.lazy(() => import('@/registry/core/ui/magnified-dock')),
  },
  'multi-step-component': {
    name: 'multi-step-component',
    type: 'components:ui',
    files: ['src/registry/core/ui/multi-step-component.tsx'],
    component: React.lazy(
      () => import('@/registry/core/example/multi-step-survey-demo'), //demo component
    ),
  },
  'animated-check': {
    name: 'animated-check',
    type: 'components:ui',
    files: ['src/registry/core/ui/animated-check.tsx'],
    component: React.lazy(
      () => import('@/registry/core/example/checkbox-demo'), //demo component
    ),
  },
  'animated-list': {
    name: 'animated-list',
    type: 'components:ui',
    files: ['src/registry/core/ui/animated-list.tsx'],
    component: React.lazy(() => import('@/registry/core/ui/animated-list')),
  },
  collapsible: {
    name: 'collapsible',
    type: 'components:ui',
    files: ['src/registry/core/ui/collapsible.tsx'],
    component: React.lazy(
      () => import('@/registry/core/example/collapsible-demo'), //demo component
    ),
  },
  'resizable-panel': {
    name: 'resizable-panel',
    type: 'components:ui',
    files: ['src/registry/core/ui/resizable-panel.tsx'],
  },
  'status-button': {
    name: 'status-button',
    type: 'components:ui',
    files: ['src/registry/core/ui/status-button.tsx'],
  },
  'shared-layout-modal': {
    name: 'shared-layout-modal',
    type: 'components:ui',
    files: ['src/registry/core/ui/shared-layout-modal.tsx'],
    component: React.lazy(
      () => import('@/registry/core/ui/shared-layout-modal'),
    ),
  },
  calendar: {
    name: 'calendar',
    type: 'components:ui',
    files: ['src/registry/core/ui/calendar.tsx'],
    component: React.lazy(() => import('@/registry/core/ui/calendar')),
  },
  carousel: {
    name: 'carousel',
    type: 'components:ui',
    files: ['src/registry/core/ui/carousel.tsx'],
    component: React.lazy(() => import('@/registry/core/ui/carousel')),
  },
};

const example: Registry = {
  'song-preview': {
    name: 'song-preview',
    type: 'components:example',
    files: ['src/registry/core/example/song-preview.tsx'],
    component: React.lazy(() => import('@/registry/core/example/song-preview')),
  },
  'status-button-demo': {
    name: 'status-button-demo',
    type: 'components:example',
    files: ['src/registry/core/example/status-button-demo.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/status-button-demo'), //demo component
    ),
  },
  'resizable-panel-demo': {
    name: 'resizable-panel-demo',
    type: 'components:example',
    files: ['src/registry/core/example/resizable-panel-demo.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/resizable-panel-demo'), //demo component
    ),
  },
  'collapsible-demo': {
    name: 'collapsible-demo',
    type: 'components:example',
    files: ['src/registry/core/example/collapsible-demo.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/collapsible-demo'), //demo component
    ),
  },
  'copy-button-demo': {
    name: 'copy-button-demo',
    type: 'components:example',
    files: ['src/registry/core/example/copy-button-demo.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/copy-button-demo'), //demo component
    ),
  },

  'checkbox-demo': {
    name: 'checkbox-demo',
    type: 'components:example',
    files: ['src/registry/core/example/checkbox-demo.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/checkbox-demo'), //demo component
    ),
  },
  'multi-step-survey-demo': {
    name: 'multi-step-survey-demo',
    type: 'components:example',
    files: ['src/registry/core/example/multi-step-survey-demo.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/multi-step-survey-demo'), //demo component
    ),
  },
  'multi-step-wizard-demo': {
    name: 'multi-step-wizard-demo',
    type: 'components:example',
    files: ['src/registry/core/example/multi-step-wizard-demo.tsx'],
    component: React.lazy(
      () => import('@/registry/core/example/multi-step-wizard-demo'),
    ),
  },
  'magnified-dock-demo': {
    name: 'magnified-dock-demo',
    type: 'components:example',
    files: ['src/registry/core/example/magnified-dock-demo.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/magnified-dock-demo'), //demo file
    ),
  },
  'animated-tabs-demo': {
    name: 'animated-tabs-demo',
    type: 'components:example',
    files: ['src/registry/core/example/animated-tabs-demo.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/animated-tabs-demo'), //demo file
    ),
  },
};

export const registry: Registry = {
  ...ui,
  ...example,
};
