import { docs } from 'collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import type { Node, Root } from 'fumadocs-core/page-tree';
import { i18n } from '@/lib/i18n';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  i18n,
  plugins: [lucideIconsPlugin()],
});

const koreanSidebarLabels: Record<string, string> = {
  'Getting Started': '시작하기',
  Reference: '레퍼런스',
  Guides: '가이드',
  Integrations: '통합',
  Advanced: '고급',
  Entrypoints: '엔트리포인트',
  Bodies: '요청 본문',
  'Grouped request': '그룹 요청',
  'Path and query': '경로와 쿼리',
  'Runtime context': '런타임 컨텍스트',
  'Shortcut methods': '단축 메서드',
  Types: '타입',
  'Error handling': '오류 처리',
  'Generated OpenAPI types': '생성된 OpenAPI 타입',
  'ky hooks': 'ky 훅',
  'Uploads and forms': '업로드와 폼',
  'Response inference': '응답 추론',
  Migration: '마이그레이션',
  Troubleshooting: '문제 해결',
};

function translateSidebarName(name: Root['name']) {
  return typeof name === 'string' ? koreanSidebarLabels[name] ?? name : name;
}

function localizeKoreanSidebarNode(node: Node): Node {
  if (node.type === 'folder') {
    return {
      ...node,
      name: translateSidebarName(node.name),
      index: node.index
        ? {
            ...node.index,
            name: translateSidebarName(node.index.name),
          }
        : undefined,
      children: node.children.map(localizeKoreanSidebarNode),
    };
  }

  return {
    ...node,
    name: translateSidebarName(node.name),
  };
}

export function getDocsPageTree(locale: string): Root {
  const tree = source.getPageTree(locale);

  if (locale !== 'ko') return tree;

  return {
    ...tree,
    name: translateSidebarName(tree.name),
    fallback: tree.fallback
      ? {
          ...tree.fallback,
          name: translateSidebarName(tree.fallback.name),
          children: tree.fallback.children.map(localizeKoreanSidebarNode),
        }
      : undefined,
    children: tree.children.map(localizeKoreanSidebarNode),
  };
}

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.webp'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
