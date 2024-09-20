import type { TSiteNav } from '@MG/types'

import { useState } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { Link } from '@MG/components/Link/Link'
import { stopEvt } from '@MG/utils/dom/stopEvt'

export type TItem = TSiteNav & {
  id?:string
  key?:string
  active?:string
  children?:Record<string|number, TItem>
  onClick?:(event:any, id?:string, href?:string, text?:string) => void
}

const ItemText = (props:TItem & {open?:boolean, setOpen?:(stat:boolean) => void}) => {
  const {
    id,
    text,
    url,
    open,
    active,
    setOpen,
    onClick,
    children,
  } = props

  const isActive = active === url

  return (
    <Link
      href={url}
      onClick={(evt:any) => {
        url ? onClick?.(evt, id, url) : stopEvt(evt)
        children && setOpen?.(!open)
      }}
      className={cls(
        `no-underline`,
        `mg-menu-item-text`,
        `rounded-med`,
        `hover:bg-base-200`,
        `active:!bg-base-200`,
        `active:!text-primary`,
        `focus:!bg-base-200`,
        `focus:!text-primary`,
        isActive && `bg-base-200`,
        isActive && `text-primary`,
      )}
    >
      {text}
    </Link>
  )
}


export const Item = (props:TItem) => {

  const {
    id,
    dir,
    active,
    onClick,
    children,
  } = props

  const isOpen = children && active?.includes?.(`/${dir}/`)
  const [open, setOpen] = useState(isOpen)

  return (
    <li id={id} className={cls(
      `mg-menu-item`,
      `text-gray-400`,
      `!bg-transparent`,
      `active:text-primary`,
      `hover:text-primary`,
      `focus:text-primary`,
    )} >
      {!children ? (
        <ItemText {...props} />
      ) : (
        <details open={open} >
          <summary
            className={cls(
              `rounded-med`,
              `text-gray-400`,
              `hover:text-primary`,
              `hover:bg-base-200`,
              `active:!bg-base-200`,
              `active:!text-primary`,
              `focus:!bg-base-200`,
              `focus:!text-current`,
            )}
          >
            <ItemText
              {...props}
              open={open}
              setOpen={setOpen}
            />
          </summary>
          <ul className={cls(`mg-menu-item-list`)} >
            {Object.entries(children).map(([key, child]) => {
              return (
                <Item
                  active={active}
                  onClick={onClick}
                  key={key || child?.key || child.id || child.text}
                  {...child}
                />
              )
            })}
          </ul>
        </details>
      )}
    </li>
  )
}
