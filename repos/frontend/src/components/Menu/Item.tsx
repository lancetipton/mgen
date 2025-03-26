import type { TSiteNav } from '@MG/types'
import type { MutableRefObject } from 'react'

import { useState, useEffect } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { Link } from '@MG/components/Link/Link'
import { stopEvt } from '@MG/utils/dom/stopEvt'
import { useMGenDir } from '@MG/hooks/components/useMGenDir'

export type TItem = TSiteNav & {
  id?:string
  key?:string
  active?:string
  children?:Record<string|number, TItem>
  onClick?:(event:any, id?:string, href?:string, text?:string) => void
}

export type TItemWithARef = TItem & {
  activeRef: MutableRefObject<string>
}

export type TItemText = TItem & {
  open?:boolean,
  activeParent?:boolean
  setOpen?:(stat:boolean) => void
}

const ItemText = (props:TItemText) => {
  const {
    id,
    text,
    url,
    open,
    active,
    setOpen,
    onClick,
    children,
    activeParent
  } = props

  const isActive = activeParent || (active === url)

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


export const Item = (props:TItemWithARef) => {

  const {
    id,
    dir,
    url,
    config,
    active,
    onClick,
    children,
    activeRef,
  } = props


  const activeParent = children && active && active.startsWith(dir)

  const [open, setOpen] = useState(activeParent)

  const onSummaryClick = (evt:any) => {
    url ? onClick?.(evt, id, url) : stopEvt(evt)
    children && setOpen(!open)
  }

  const {
    items
  } = useMGenDir({ children, config })


  useEffect(() => {
    if(!children || !activeParent || open || (activeRef?.current === active))
      return

    activeRef.current = active
    setOpen(true)

  }, [dir, active, children, activeParent, open])

  return (
    <li id={id} className={cls(
      `mg-menu-item`,
      `text-gray-400`,
      `!bg-transparent`,
      `active:text-primary`,
      `hover:text-primary`,
      `focus:text-primary`,
    )} >
      {!items?.length ? (
        <ItemText {...props} />
      ) : (
        <details open={open} >
          <summary
            onClick={onSummaryClick}
            className={cls(
              `rounded-med`,
              `text-gray-400`,
              `hover:text-primary`,
              `hover:bg-base-200`,
              `active:!bg-base-200`,
              `active:!text-primary`,
              activeParent && `bg-base-200`,
              activeParent && `text-primary`,
            )}
          >
            <ItemText
              {...props}
              open={open}
              setOpen={setOpen}
              activeParent={activeParent}
            />
          </summary>
          <ul className={cls(`mg-menu-item-list`)} >
            {items.map(({key, ...child}) => {
              return (
                <Item
                  active={active}
                  onClick={onClick}
                  activeRef={activeRef}
                  key={key || child.id || child.text}
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
