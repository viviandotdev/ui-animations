import { MainNavItem, SidebarNavItem } from '@/types/nav';

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Components',
      href: '/components',
    },
    // {
    //   title: "Templates",
    //   href: "/templates",
    // },
  ],
  sidebarNav: [
    {
      title: 'Components',
      items: [
        {
          title: 'Animated Tabs',
          href: `/docs/components/animated-tabs`,
          items: [],
        },
        {
          title: 'Magnified Dock',
          href: `/docs/components/magnified-dock`,
          items: [],
        },
        {
          title: 'Multi Step Component',
          href: `/docs/components/multi-step-component`,
          items: [],
        },
        {
          title: 'Animated Check',
          href: `/docs/components/animated-check`,
          items: [],
        },
        {
          title: 'Animated List',
          href: `/docs/components/animated-list`,
          items: [],
        },
        {
          title: 'Collapsible',
          href: `/docs/components/collapsible`,
          items: [],
        },
      ],
    },
  ],
};
