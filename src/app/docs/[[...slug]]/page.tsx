import { allDocs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import '@/styles/mdx.css';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Mdx } from '@/components/mdx-components';
import DocsPager from '@/components/pager';

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
        <div className='pb-8 pt-8'>
          <Mdx code={doc.body.code} />
        </div>
        <section>
          {doc.resources && doc.resources.length > 0 && (
            <>
              <h2 className='mb-1 text-lg font-semibold'>Resources</h2>
              <p className='mb-4 text-sm text-muted-foreground'>
                Some links for inspiration.
              </p>
            </>
          )}
          <ul className='list-disc space-y-2 pl-6'>
            {doc.resources &&
              doc.resources.map((link, index: number) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className='text-sm font-medium text-primary'
                  >
                    {link.key}
                  </a>
                </li>
              ))}
          </ul>
        </section>
        <div className='mt-12'>
          <DocsPager doc={doc} />
        </div>
      </div>
    </main>
  );
};

export default DocPage;
