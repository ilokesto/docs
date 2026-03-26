import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { ReactNode } from 'react';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  return (
    <DocsLayout tree={source.getPageTree(resolvedParams.lang)} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
