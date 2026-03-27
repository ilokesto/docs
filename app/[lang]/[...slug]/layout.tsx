import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, getPackageTabs } from '@/lib/layout.shared';
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
    <DocsLayout
      tree={source.getPageTree(resolvedParams.lang)}
      tabs={getPackageTabs(resolvedParams.lang)}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
