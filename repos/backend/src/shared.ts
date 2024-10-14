// **IMPORTANT** - Only include items that can be shared between backend and frontend
// Do not include backend only node_modules in this file or the frontend will break

import type { TSiteSearch } from './types/site.types'


export const DefSiteSearch:TSiteSearch = {
  preset: `match`,
  cache: 100,
  tokenize: `full`,
  document: {
    id: `id`,
    store: [`path`, `text`],
    index: [`path`, `text`],
  },
  context: {
    depth: 2,
    resolution: 9,
    bidirectional: true
  }
}