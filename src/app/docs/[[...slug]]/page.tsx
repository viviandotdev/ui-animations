import { allDocs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import '@/styles/mdx.css';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Mdx } from '@/components/mdx-components';

interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join('/') || '';
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

const DocPage: React.FC<DocPageProps> = async ({ params }) => {
  const doc = await getDocFromParams({ params });
  if (!doc) {
    return notFound();
  }

  return (
    <main className='relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]'>
      <div className='mx-auto w-full min-w-0'>
        <div className='mb-4 flex items-center space-x-1 text-sm text-muted-foreground'>
          <div className='truncate'>Docs</div>
          <Icons.ChevronRight className='size-4' />
          <div className='font-medium text-foreground'>{doc.title}</div>
        </div>
        <div className='space-y-2'>
          <h1 className={cn('scroll-m-20 text-4xl font-bold tracking-tight')}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className='text-balance text-lg text-muted-foreground'>
              {doc.description}
            </p>
          )}
        </div>

        {/* {doc.links ? (
          <div className='flex items-center space-x-2 pt-4'>
            {doc.links?.doc && (
              <Link
                href={doc.links.doc}
                target='_blank'
                rel='noreferrer'
                className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
              >
                Docs
                <ExternalLinkIcon className='size-3' />
              </Link>
            )}
            {doc.links?.api && (
              <Link
                href={doc.links.api}
                target='_blank'
                rel='noreferrer'
                className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
              >
                API Reference
                <ExternalLinkIcon className='size-3' />
              </Link>
            )}
          </div>
        ) : null} */}
        <div className='pb-12 pt-8'>
          <Mdx code={doc.body.code} />
        </div>
        {/* <DocPager doc={doc} /> */}
      </div>
    </main>
  );
};

export default DocPage;
