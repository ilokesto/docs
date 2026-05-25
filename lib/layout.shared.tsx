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
        className={`size-3 rounded-sm shrink-0 ${packageMetadata[pkg].colorClass}`}
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
  const isKorean = lang === 'ko';
  const disabledProps = {
    'aria-disabled': true,
    tabIndex: -1,
    className:
      'pointer-events-none cursor-not-allowed opacity-50 hover:bg-transparent hover:text-fd-muted-foreground',
  } as const;

  return [
    {
      title: 'Store',
      description: isKorean
        ? '작고 명확한 vanilla 상태 컨테이너'
        : 'Minimal vanilla state container',
      url: `/${lang}/store`,
      icon: <PackageIcon pkg="store" />,
    },
    {
      title: 'State',
      description: isKorean
        ? '프레임워크 친화적인 상태 헬퍼'
        : 'Framework-friendly state helpers',
      url: `/${lang}/state`,
      icon: <PackageIcon pkg="state" />,
    },
    {
      title: 'Form',
      description: isKorean
        ? '타입 안전 form primitive 준비 중'
        : 'Type-safe form primitives coming soon',
      url: '#',
      icon: <PackageIcon pkg="form" />,
      props: disabledProps,
    },
    {
      title: 'Overlay',
      description: isKorean
        ? 'Overlay primitive 준비 중'
        : 'Overlay primitives coming soon',
      url: '#',
      icon: <PackageIcon pkg="overlay" />,
      props: disabledProps,
    },
    {
      title: 'Modal',
      description: isKorean
        ? 'Modal primitive 준비 중'
        : 'Modal primitives coming soon',
      url: '#',
      icon: <PackageIcon pkg="modal" />,
      props: disabledProps,
    },
    {
      title: 'Toast',
      description: isKorean
        ? 'Toast runtime 준비 중'
        : 'Toast runtime coming soon',
      url: '#',
      icon: <PackageIcon pkg="toast" />,
      props: disabledProps,
    },
    {
      title: 'Utilinent',
      description: isKorean
        ? 'React rendering utility'
        : 'React rendering utilities',
      url: `/${lang}/utilinent`,
      icon: <PackageIcon pkg="utilinent" />,
    },
  ];
}
