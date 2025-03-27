import type { TSiteNav } from '@MG/types'
import { getNavOrder } from '@MG/utils/sites/getNavOrder'
import { sortNavItems } from '@MG/utils/sites/sortNavItems'
import { getNavItemArr } from '@MG/utils/sites/getNavItemArr'


/**
 * Builds the steps navigation base on the passed in site nav object
 */
export const buildSteps = (nav:TSiteNav) => {
  const arr:TSiteNav[] = nav.url ? [nav] : []

  const config = nav?.config || {}

  const order = config?.order ? getNavOrder(config?.order) : undefined

  const arrItems = getNavItemArr(nav.children, config)

  const items = order && arrItems?.length
    ? sortNavItems(arrItems, order)
    : arrItems

  const steps = items.reduce((acc, nav) => {
    if(nav.url) acc.push(nav)

    return nav.children ? [...acc, ...buildSteps(nav)] : acc
  }, arr)

  return steps
}