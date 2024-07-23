import { Doc } from 'contentlayer/generated';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';

import { docsConfig } from '@/constant/docs';

import { NavItem, NavItemWithChildren } from '@/types/nav';

interface DocsPagerProps {
  doc: Doc;
}
export const DocsPager: React.FC<DocsPagerProps> = ({ doc }) => {
  const pager = getPagerForDoc(doc);
  if (!pager) {
    return null;
  }

  return (
    <div className='flex w-full justify-between'>
      {pager.prev && pager.prev.href && (
        <Link
          href={pager.prev.href}
          className={buttonVariants({ variant: 'outline' })}
        >
          <Icons.ChevronLeft className='mr-2 h-4 w-4' />
          {pager.prev.title}
        </Link>
      )}

      {pager.next && pager.next.href && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: 'outline' }), 'ml-auto')}
        >
          {pager.next.title}
          <Icons.ChevronRight className='ml-2 h-4 w-4' />
        </Link>
      )}
    </div>
  );
};

export function getPagerForDoc(doc: Doc) {
  const nav = docsConfig.sidebarNav;
  const flattenedLinks = [null, ...flatten(nav), null];
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href,
  );

  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return flat.concat(link.items?.length ? flatten(link.items) : link);
    }, [])
    .filter((link) => !link?.disabled);
}

export default DocsPager;
