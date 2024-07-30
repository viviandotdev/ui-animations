import { allDocs } from 'contentlayer/generated';

import { MainNavItem, SidebarNavItem } from '@/types/nav';

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

const sortAlphabetically = (a: SidebarNavItem, b: SidebarNavItem) => {
  return (a.sortId ?? a.title)
    .toLowerCase()
    .localeCompare((b.sortId ?? b.title).toLowerCase());
};

const createLinks = (category: string) => {
  return allDocs
    .filter((doc) => doc.slug.startsWith(`/docs/${category}`) && doc.published)
    .map((doc) => ({
      // Make sure the index page is the first item
      title: doc.title,
      sortId: doc.slug === `/docs/${category}` ? '000' : doc.title,
      href: doc.slug,
      items: [],
    }))
    .sort(sortAlphabetically);
};

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
      items: createLinks('components'),
    },
    {
      title: 'Button',
      items: createLinks('buttons'),
    },
  ],
};
