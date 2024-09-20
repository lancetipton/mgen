import type { ReactNode } from 'react'
import type { TItem } from '@MG/components/Menu/Item'

import { cls } from '@keg-hub/jsutils/cls'
import { Item as MItem } from '@MG/components/Menu/Item'


export type TMenu = {
  Item?:any
  path?:string
  Header?:ReactNode
  HeaderIcon?:ReactNode
  headerText?:ReactNode
  items?:Record<string|number, TItem>
  onClick?:(event:any, id?:string, href?:string, text?:string) => void
}

export const Menu = (props:TMenu) => {
  
  const {
    path,
    items,
    Header,
    onClick,
    Item=MItem,
    HeaderIcon,
    headerText,
  } = props

  return (
    <div
      className={cls(
        `mg-menu`,
        `flex flex-col`,
      )}
    >
      {Header || (headerText && (
        <div
          className={cls(
            `mg-menu-header`,
            `flex`,
          )}
        >
          <div className={cls(`mg-menu-header-icon`)}>
            {HeaderIcon}
          </div>
          <div className={cls(`mg-menu-header-text`)}>
            {headerText}
          </div>
        </div>
      )) || null}

      {items && (
        <div
          className={cls(
            `mg-menu-list-container`,
            `flex flex-col`,
          )}
        >
          <ul
            className={cls(
              `menu`,
              `p-0`,
              `bg-base-100`,
              `mg-menu-list`,
          )}>
            {Object.entries(items).map(([key, item]) => {
              return (
                <Item
                  active={path}
                  onClick={onClick}
                  key={item.key || item.id || item.text || key}
                  {...item}
                />
              )
            })}
          </ul>
        </div>
      )}
    </div>
    
  )
  
}