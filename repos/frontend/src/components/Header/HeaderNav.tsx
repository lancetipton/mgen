import type { THeaderItem } from '@MG/components/Header/Headertem'

import { cls } from '@keg-hub/jsutils/cls'
import { HeaderItem } from '@MG/components/Header/Headertem'

export type THeaderNav = {
  className?:string
  items?:THeaderItem[]
}

export const HeaderNav = (props:THeaderNav) => {

  const {
    items,
    className
  } = props

  return (
    <div className={cls(
      className,
      `mg-header-nav`,
      `flex flex-col px-2 md:flex-row md:mx-10 md:py-0`
    )}>
      {items?.map(item => {
        return (<HeaderItem {...item} />)
      })}
    </div>
  )

}