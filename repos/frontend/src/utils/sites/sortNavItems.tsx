import type { TItem } from '@MG/types'


type TItemKey = TItem & {
  key:string
}


export const sortNavItems = (
  items:TItemKey[],
  order:Record<string, number>
) => {
  return items.sort((a, b) => {

    const idxA = order[a.key]
    const idxB = order[b.key]
    if (idxA === undefined) return 1
    if (idxB === undefined) return -1

    return idxA - idxB;
  })
}
