import type { TSiteNav } from '@MG/types'
import type { TItem } from '@MG/components/Menu/Item'

import { useMemo } from 'react'

export type THMgenDir = TItem & {}

const getOrder = (items:string[]) => {
  return items.reduce((acc, str, idx) => {
    acc[str] = idx
    return acc
  }, {})
}

type TItemKey = TItem & {
  key:string
}


const sortItems = (
  children:TItemKey[],
  order:Record<string, number>
) => {
  return children.sort((a, b) => {

    const idxA = order[a.key]
    const idxB = order[b.key]
    if (idxA === undefined) return 1
    if (idxB === undefined) return -1

    return idxA - idxB;
  })
}

export const useMGenDir = (props:THMgenDir) => {
  const {
    config,
    children,
  } = props

  const order = useMemo(() => config?.order ? getOrder(config?.order) : undefined, [config?.order])

  const values = useMemo(() => {
    return !children
      ? []
      : Object.values(children).reduce((acc, child) => {
          const key = child.path.split(`/`).pop()

          !config?.exclude?.includes?.(key)
            && acc.push({...child, key})

          return acc
        }, [])
  }, [children, config?.exclude])

  const items = useMemo(() => {
    return order && values?.length ? sortItems(values, order) : values
  }, [order, values])

  return {
    items
  }
}