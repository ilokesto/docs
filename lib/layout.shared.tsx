import type { BaseLayoutProps, LayoutTab } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export const packageMetadata: Record<string, { colorClass: string; cssVarDark: string; cssVarLight: string; fgVarDark: string; fgVarLight: string }> = {
  store: {
    colorClass: 'bg-emerald-500',
    cssVarLight: 'var(--color-emerald-600)',
    cssVarDark: 'var(--color-emerald-400)',
    fgVarLight: 'hsl(0, 0%, 98%)',
    fgVarDark: 'hsl(0, 0%, 9%)',
  },
  state: {
    colorClass: 'bg-blue-500',
    cssVarLight: 'var(--color-blue-600)',
    cssVarDark: 'var(--color-blue-400)',
    fgVarLight: 'hsl(0, 0%, 98%)',
    fgVarDark: 'hsl(0, 0%, 9%)',
  },
  overlay: {
    colorClass: 'bg-cyan-500',
    cssVarLight: 'var(--color-cyan-600)',
    cssVarDark: 'var(--color-cyan-400)',
    fgVarLight: 'hsl(0, 0%, 98%)',
    fgVarDark: 'hsl(0, 0%, 9%)',
  },
  modal: {
    colorClass: 'bg-indigo-500',
    cssVarLight: 'var(--color-indigo-600)',
    cssVarDark: 'var(--color-indigo-400)',
    fgVarLight: 'hsl(0, 0%, 98%)',
    fgVarDark: 'hsl(0, 0%, 9%)',
  },
  toast: {
    colorClass: 'bg-violet-500',
    cssVarLight: 'var(--color-violet-600)',
    cssVarDark: 'var(--color-violet-400)',
    fgVarLight: 'hsl(0, 0%, 98%)',
    fgVarDark: 'hsl(0, 0%, 9%)',
  },
  form: {
    colorClass: 'bg-red-500',
    cssVarLight: 'var(--color-red-600)',
    cssVarDark: 'var(--color-red-400)',
    fgVarLight: 'hsl(0, 0%, 98%)',
    fgVarDark: 'hsl(0, 0%, 9%)',
  },
  utilinent: {
    colorClass: 'bg-amber-500',
    cssVarLight: 'var(--color-amber-600)',
    cssVarDark: 'var(--color-amber-400)',
    fgVarLight: 'hsl(0, 0%, 98%)',
    fgVarDark: 'hsl(0, 0%, 9%)',
  },
};

function PackageIcon({ pkg }: { pkg: keyof typeof packageMetadata }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={`size-3 rounded-[4px] shrink-0 ${packageMetadata[pkg].colorClass}`}
      />
    </div>
  );
}

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
      icon: <PackageIcon pkg="store" />,
    },
    {
      title: 'State',
      description: 'React state hooks on top of @ilokesto/store',
      url: `/${lang}/state`,
      icon: <PackageIcon pkg="state" />,
    },
    {
      title: 'Overlay',
      description: 'Accessible overlay primitives',
      url: `/${lang}/overlay`,
      icon: <PackageIcon pkg="overlay" />,
    },
    {
      title: 'Modal',
      description: 'Promise-based dialogs with smooth motion',
      url: `/${lang}/modal`,
      icon: <PackageIcon pkg="modal" />,
    },
    {
      title: 'Toast',
      description: 'Lightweight toast notifications',
      url: `/${lang}/toast`,
      icon: <PackageIcon pkg="toast" />,
    },
    {
      title: 'Form',
      description: 'Type-safe form primitives coming soon',
      url: '#',
      icon: <PackageIcon pkg="form" />,
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
      icon: <PackageIcon pkg="utilinent" />,
    },
  ];
}
