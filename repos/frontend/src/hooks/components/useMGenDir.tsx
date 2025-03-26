import type { TItem } from '@MG/types'

import { useMemo } from 'react'
import { getNavOrder } from '@MG/utils/sites/getNavOrder'
import { sortNavItems } from '@MG/utils/sites/sortNavItems'
import { getNavItemArr } from '@MG/utils/sites/getNavItemArr'


export type THMgenDir = TItem & {}

export const useMGenDir = (props:THMgenDir) => {
  const {
    config,
    children,
  } = props

  const order = useMemo(
    () => config?.order ? getNavOrder(config?.order) : undefined,
    [config?.order]
  )

  const values = useMemo(
    () => getNavItemArr(children, config),
    [children, config?.exclude]
  )

  const items = useMemo(
    () => order && values?.length ? sortNavItems(values, order) : values,
    [order, values]
  )

  return {
    items
  }
}