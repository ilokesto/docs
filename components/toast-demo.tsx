"use client";

import { useId, useState } from "react";
import { toast, Toaster } from "@ilokesto/toast";
import type { ToastPosition } from "@ilokesto/toast";

type Locale = "en" | "ko";

interface ToastDemoProps {
  readonly locale?: Locale;
}

type Copy = {
  eyebrow: string;
  title: string;
  body: string;
  basics: string;
  basicsLead: string;
  advanced: string;
  advancedLead: string;
  positions: string;
  positionsLead: string;
  defaultLabel: string;
  successLabel: string;
  errorLabel: string;
  loadingLabel: string;
  promiseLabel: string;
  customStyleLabel: string;
  customContentLabel: string;
  dismissAllLabel: string;
  loadingMessage: string;
  successMessage: string;
  errorMessage: string;
  promiseLoading: string;
  promiseSuccess: string;
  promiseError: string;
  customStyleMessage: string;
  customContentMessage: string;
  positionMessage: (position: string) => string;
  positionNames: Record<string, string>;
};

const COPY: Record<Locale, Copy> = {
  en: {
    eyebrow: "Live playground",
    title: "Trigger real toasts before you commit to the API",
    body:
      "This runs the actual package, not a mocked screenshot. Try the common paths, stress the motion, and get a feel for the default renderer first.",
    basics: "Basics",
    basicsLead: "The familiar facade should feel instant and obvious.",
    advanced: "Flows worth testing",
    advancedLead: "Promise transitions, custom styling, and JSX content are where a toast package starts to show its real character.",
    positions: "Position behavior",
    positionsLead: "Fire the same toast into each corner and center slot to see how the stack behaves.",
    defaultLabel: "Default",
    successLabel: "Success",
    errorLabel: "Error",
    loadingLabel: "Loading → success",
    promiseLabel: "Promise",
    customStyleLabel: "Custom style",
    customContentLabel: "Custom content",
    dismissAllLabel: "Dismiss all",
    loadingMessage: "Uploading assets…",
    successMessage: "Upload finished.",
    errorMessage: "Something failed. Try again.",
    promiseLoading: "Saving project…",
    promiseSuccess: "Project saved.",
    promiseError: "Save failed.",
    customStyleMessage: "Dark pill, quiet confidence.",
    customContentMessage: "Custom content that still fits the stack.",
    positionMessage: (position) => `Now showing at ${position}.`,
    positionNames: {
      "top-left": "Top left",
      "top-center": "Top center",
      "top-right": "Top right",
      "bottom-left": "Bottom left",
      "bottom-center": "Bottom center",
      "bottom-right": "Bottom right",
    },
  },
  ko: {
    eyebrow: "라이브 플레이그라운드",
    title: "API를 붙이기 전에 실제 토스트를 먼저 눌러보세요",
    body:
      "정적 이미지가 아니라 실제 패키지를 여기서 바로 실행합니다. 가장 흔한 경로부터 눌러보고, 모션과 기본 렌더러 감각을 먼저 확인해보세요.",
    basics: "기본 시나리오",
    basicsLead: "익숙한 facade가 얼마나 바로 손에 익는지 직접 확인할 수 있습니다.",
    advanced: "차이가 드러나는 흐름",
    advancedLead: "promise 전환, 커스텀 스타일, JSX 콘텐츠 같은 구간에서 토스트 패키지의 완성도가 드러납니다.",
    positions: "포지션 동작",
    positionsLead: "같은 토스트를 각 위치에 쏴보면서 스택 감각을 비교해보세요.",
    defaultLabel: "기본",
    successLabel: "성공",
    errorLabel: "에러",
    loadingLabel: "로딩 → 성공",
    promiseLabel: "프라미스",
    customStyleLabel: "스타일 커스텀",
    customContentLabel: "콘텐츠 커스텀",
    dismissAllLabel: "모두 닫기",
    loadingMessage: "에셋을 업로드하는 중…",
    successMessage: "업로드가 끝났습니다.",
    errorMessage: "문제가 생겼습니다. 다시 시도해주세요.",
    promiseLoading: "프로젝트를 저장하는 중…",
    promiseSuccess: "프로젝트가 저장되었습니다.",
    promiseError: "저장에 실패했습니다.",
    customStyleMessage: "작고 단단한 다크 필 스타일입니다.",
    customContentMessage: "커스텀 콘텐츠도 스택 안에서 자연스럽게 동작합니다.",
    positionMessage: (position) => `${position} 위치에서 표시했습니다.`,
    positionNames: {
      "top-left": "왼쪽 위",
      "top-center": "가운데 위",
      "top-right": "오른쪽 위",
      "bottom-left": "왼쪽 아래",
      "bottom-center": "가운데 아래",
      "bottom-right": "오른쪽 아래",
    },
  },
};

const POSITIONS = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const satisfies readonly ToastPosition[];

function DemoButton({
  label,
  onClick,
  tone = "neutral",
}: {
  readonly label: string;
  readonly onClick: () => void;
  readonly tone?: "neutral" | "primary" | "success" | "danger";
}) {
  const toneClassName = {
    neutral:
      "border-fd-border bg-fd-card text-fd-foreground hover:border-fd-primary/40 hover:bg-fd-accent",
    primary:
      "border-fd-primary/25 bg-fd-primary text-fd-primary-foreground hover:opacity-95",
    success:
      "border-emerald-500/30 bg-emerald-500 text-white hover:opacity-95",
    danger:
      "border-rose-500/30 bg-rose-500 text-white hover:opacity-95",
  }[tone];

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition ${toneClassName}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function Section({
  title,
  lead,
  children,
}: {
  readonly title: string;
  readonly lead: string;
  readonly children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-fd-border bg-fd-card/80 p-4 shadow-sm">
      <div className="space-y-1">
        <h3 className="m-0 text-base font-semibold text-fd-foreground">{title}</h3>
        <p className="m-0 text-sm leading-6 text-fd-muted-foreground">{lead}</p>
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </section>
  );
}

export function ToastDemo({ locale = "en" }: ToastDemoProps) {
  const copy = COPY[locale];
  const toasterId = useId();
  const [activePosition, setActivePosition] = useState<ToastPosition>("top-right");

  const toastOptions = { toasterId };

  return (
    <div className="not-prose my-6 overflow-hidden rounded-[28px] border border-fd-border bg-linear-to-br from-fd-card via-fd-card to-fd-card/70 shadow-sm">
      <div className="border-b border-fd-border/80 px-5 py-5 sm:px-6">
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.22em] text-fd-primary">
          {copy.eyebrow}
        </p>
        <div className="mt-3 space-y-2">
          <h2 className="m-0 text-2xl font-semibold tracking-tight text-fd-foreground sm:text-[1.8rem]">
            {copy.title}
          </h2>
          <p className="m-0 max-w-3xl text-sm leading-7 text-fd-muted-foreground sm:text-[15px]">
            {copy.body}
          </p>
        </div>
      </div>

      <div className="grid gap-4 px-5 py-5 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-4">
          <Section title={copy.basics} lead={copy.basicsLead}>
            <DemoButton label={copy.defaultLabel} tone="primary" onClick={() => toast("Hello from ilokesto.", toastOptions)} />
            <DemoButton label={copy.successLabel} tone="success" onClick={() => toast.success(copy.successMessage, toastOptions)} />
            <DemoButton label={copy.errorLabel} tone="danger" onClick={() => toast.error(copy.errorMessage, toastOptions)} />
            <DemoButton
              label={copy.loadingLabel}
              onClick={() => {
                const id = toast.loading(copy.loadingMessage, toastOptions);
                window.setTimeout(() => {
                  toast.success(copy.successMessage, { ...toastOptions, id });
                }, 1400);
              }}
            />
          </Section>

          <Section title={copy.advanced} lead={copy.advancedLead}>
            <DemoButton
              label={copy.promiseLabel}
              onClick={() => {
                toast.promise(
                  new Promise((resolve, reject) => {
                    window.setTimeout(() => {
                      if (Math.random() > 0.4) {
                        resolve(true);
                        return;
                      }

                      reject(new Error(copy.promiseError));
                    }, 1800);
                  }),
                  {
                    loading: copy.promiseLoading,
                    success: copy.promiseSuccess,
                    error: copy.promiseError,
                  },
                  toastOptions,
                );
              }}
            />
            <DemoButton
              label={copy.customStyleLabel}
              onClick={() =>
                toast(copy.customStyleMessage, {
                  ...toastOptions,
                  style: {
                    borderRadius: 999,
                    background: "#111827",
                    color: "#f9fafb",
                    boxShadow: "0 12px 32px rgba(15, 23, 42, 0.28)",
                  },
                })
              }
            />
            <DemoButton
              label={copy.customContentLabel}
              onClick={() =>
                toast.custom(
                  <div className="rounded-2xl bg-linear-to-r from-sky-500 via-cyan-500 to-emerald-500 px-4 py-3 text-sm font-medium text-white shadow-lg">
                    {copy.customContentMessage}
                  </div>,
                  toastOptions,
                )
              }
            />
            <DemoButton label={copy.dismissAllLabel} onClick={() => toast.dismiss(undefined, toasterId)} />
          </Section>
        </div>

        <Section title={copy.positions} lead={copy.positionsLead}>
          <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
            {POSITIONS.map((position) => (
              <button
                key={position}
                type="button"
                className={`rounded-2xl border px-3 py-3 text-left text-sm font-medium transition ${
                  activePosition === position
                    ? "border-fd-primary/50 bg-fd-primary/10 text-fd-primary"
                    : "border-fd-border bg-fd-background text-fd-foreground hover:border-fd-primary/40 hover:bg-fd-accent"
                }`}
                onClick={() => setActivePosition(position)}
              >
                <span className="block text-sm">{copy.positionNames[position]}</span>
                <span className="mt-1 block text-xs text-fd-muted-foreground">{position}</span>
              </button>
            ))}
          </div>
        </Section>
      </div>

      <Toaster toasterId={toasterId} position={activePosition} />
    </div>
  );
}
