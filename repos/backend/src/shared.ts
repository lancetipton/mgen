// **IMPORTANT** - Only include items that can be shared between backend and frontend
// Do not include backend only node_modules in this file or the frontend will break

import type { TSiteSearch } from './types/search.types'


export const DefSiteSearch:TSiteSearch = {
  cache: 100,
  tokenize: `full`,
  document: {
    id: `id`,
    index: `text`,
    store: [`title`, `text`, `url`, `path`]
  },
  context: {
    depth: 2,
    resolution: 9,
    bidirectional: true
  }
}