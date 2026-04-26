import Image from 'next/image';
import Link from 'next/link';
import { packageMetadata } from '@/lib/layout.shared';

type Locale = 'en' | 'ko';
type PackageName = 'store' | 'state' | 'overlay' | 'modal' | 'toast' | 'utilinent' | 'form';

const packageCards = [
  {
    pkg: 'store',
    title: '@ilokesto/store',
    descriptions: {
      en: 'Minimal vanilla state container for predictable shared state.',
      ko: '예측 가능한 공유 상태를 위한 작은 vanilla 상태 컨테이너.',
    },
  },
  {
    pkg: 'state',
    title: '@ilokesto/state',
    descriptions: {
      en: 'State helpers that build on the core store without locking you into one UI layer.',
      ko: '하나의 UI 레이어에 갇히지 않고 core store 위에 쌓는 상태 헬퍼.',
    },
  },
  {
    pkg: 'overlay',
    title: '@ilokesto/overlay',
    descriptions: {
      en: 'Accessible overlay primitives with explicit runtime ownership.',
      ko: 'runtime 소유권이 명확한 접근성 중심 overlay primitive.',
    },
  },
  {
    pkg: 'modal',
    title: '@ilokesto/modal',
    descriptions: {
      en: 'Promise-based dialogs with deliberate transport and smooth motion.',
      ko: '명확한 transport와 부드러운 모션을 갖춘 promise 기반 다이얼로그.',
    },
  },
  {
    pkg: 'toast',
    title: '@ilokesto/toast',
    descriptions: {
      en: 'Lightweight toast notifications with a provider-scoped runtime.',
      ko: 'provider-scoped runtime으로 다루는 가벼운 토스트 알림.',
    },
  },
  {
    pkg: 'utilinent',
    title: '@ilokesto/utilinent',
    descriptions: {
      en: 'Declarative rendering and composition helpers for focused UI logic.',
      ko: '집중된 UI 로직을 위한 선언적 렌더링과 composition helper.',
    },
  },
  {
    pkg: 'form',
    title: '@ilokesto/form',
    descriptions: {
      en: 'Type-safe form primitives for the next package in the family.',
      ko: '다음 패키지로 준비 중인 타입 안전 form primitive.',
    },
  },
] as const;

type PackageCard = (typeof packageCards)[number];

const homeCopy: Record<Locale, {
  eyebrow: string;
  subtitle: string;
  panel: string;
  comingSoon: string;
}> = {
  en: {
    eyebrow: 'Package family',
    subtitle: 'Small state tools, UI primitives, and composition utilities for product interfaces.',
    panel:
      'Use only the layer you need: a vanilla store, framework-friendly state helpers, overlay runtimes, dialogs, toasts, forms, and rendering utilities that stay explicit instead of magical.',
    comingSoon: 'Coming soon',
  },
  ko: {
    eyebrow: '패키지 패밀리',
    subtitle: '제품 인터페이스를 위한 작은 상태 도구, UI primitive, composition utility.',
    panel:
      '필요한 레이어만 골라 쓰세요. vanilla store, 프레임워크 친화적인 상태 헬퍼, overlay runtime, dialog, toast, form, 렌더링 유틸리티까지 마법처럼 숨기기보다 명확하게 조합합니다.',
    comingSoon: '준비 중',
  },
};

function getLocale(lang: string): Locale {
  return lang === 'ko' ? 'ko' : 'en';
}

function PackageAccent({ pkg }: { pkg: PackageName }) {
  return (
    <span
      className={`mb-5 block h-2 w-16 rounded-full ${packageMetadata[pkg].colorClass}`}
      aria-hidden="true"
    />
  );
}

function PackageCardContent({
  card,
  copy,
  locale,
}: {
  readonly card: PackageCard;
  readonly copy: (typeof homeCopy)[Locale];
  readonly locale: Locale;
}) {
  return (
    <>
      <PackageAccent pkg={card.pkg} />
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-fd-foreground">
            {card.title}
          </h2>
          {card.pkg === 'form' ? (
            <span className="shrink-0 rounded-full border border-fd-border bg-fd-background px-3 py-1 text-xs font-medium text-fd-muted-foreground">
              {copy.comingSoon}
            </span>
          ) : null}
        </div>
        <p className="text-sm leading-6 text-fd-muted-foreground">
          {card.descriptions[locale]}
        </p>
      </div>
    </>
  );
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const locale = getLocale(resolvedParams.lang);
  const copy = homeCopy[locale];

  return (
    <main className="flex flex-1 flex-col bg-fd-background text-fd-foreground">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div className="space-y-6">
            <div className="flex size-20 items-center justify-center rounded-3xl border border-fd-border bg-fd-card p-3 shadow-sm">
              <Image
                src="/ilokesto-logo.webp"
                alt="ilokesto logo"
                width={56}
                height={56}
                priority
                className="size-14"
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-widest text-fd-muted-foreground">
                {copy.eyebrow}
              </p>
              <h1 className="text-5xl font-bold tracking-tight text-fd-foreground sm:text-6xl lg:text-7xl">
                ilokesto
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-fd-muted-foreground sm:text-xl">
                {copy.subtitle}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-fd-border bg-fd-card p-6 shadow-sm lg:p-8">
            <p className="text-sm leading-6 text-fd-muted-foreground">
              {copy.panel}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {packageCards.map((card) => {
            const cardClassName =
              'rounded-3xl border border-fd-border bg-fd-card p-6 shadow-sm transition hover:border-fd-primary/40 hover:bg-fd-accent';

            if (card.pkg === 'form') {
              return (
                <article
                  key={card.pkg}
                  aria-disabled="true"
                  className="rounded-3xl border border-fd-border bg-fd-card/60 p-6 opacity-70 shadow-sm"
                >
                  <PackageCardContent card={card} copy={copy} locale={locale} />
                </article>
              );
            }

            return (
              <Link
                key={card.pkg}
                href={`/${resolvedParams.lang}/${card.pkg}`}
                className={cardClassName}
              >
                <PackageCardContent card={card} copy={copy} locale={locale} />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
