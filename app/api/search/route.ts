import { source } from '@/lib/source';
import { flexsearchFromSource } from 'fumadocs-core/search/flexsearch';

export const { staticGET: GET } = flexsearchFromSource(source, {
  localeMap: {
    ko: 'cjk',
  },
});
