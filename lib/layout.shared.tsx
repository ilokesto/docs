import type { BaseLayoutProps, LayoutTab } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}

export function getPackageTabs(lang: string): LayoutTab[] {
  return [
    {
      title: 'Store',
      description: 'Minimal vanilla state container',
      url: `/${lang}/store`,
    },
    {
      title: 'State',
      description: 'React state hooks on top of @ilokesto/store',
      url: `/${lang}/state`,
    },
    {
      title: 'Form',
      description: 'Type-safe form primitives coming soon',
      url: '#',
      props: {
        'aria-disabled': true,
        tabIndex: -1,
        className:
          'pointer-events-none cursor-not-allowed opacity-50 hover:bg-transparent hover:text-fd-muted-foreground',
      },
    },
    {
      title: 'Utilinent',
      description: 'Declarative rendering and composition helpers',
      url: `/${lang}/utilinent`,
    },
  ];
}
