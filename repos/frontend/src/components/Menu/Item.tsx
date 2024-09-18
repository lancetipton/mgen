import { useState } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { Link } from '@MG/components/Link/Link'
import { stopEvt } from '@MG/utils/dom/stopEvt'

export type TItem = {
  id?:string
  key?:string
  text?:string
  url?:string
  children?:Record<string|number, TItem>
  onClick?:(event:any, id?:string, href?:string, text?:string) => void
}


const ItemText = (props:TItem & {open?:boolean, setOpen?:(stat:boolean) => void}) => {
  const {
    id,
    text,
    url,
    open,
    setOpen,
    onClick,
    children,
  } = props

  const active = window.location.pathname === url

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
        `rounded-sm`,
        `hover:text-primary`,
        `hover:bg-slate-50`,
        `active:!bg-slate-100`,
        `active:!text-primary`,
        `focus:!bg-slate-50`,
        `focus:!text-primary`,
        active && `text-primary`,
        active && `bg-slate-50`,
      )}
    >
      {text}
    </Link>
  )
}


export const Item = (props:TItem) => {

  const {
    id,
    children
  } = props

  const [open, setOpen] = useState(!children)

  return (
    <li id={id} className={cls(`mg-menu-item`)} >
      {!children ? (
        <ItemText {...props} />
      ) : (
        <details open={open} >
          <summary
            className={cls(
              `rounded-sm`,
              `hover:text-primary`,
              `hover:bg-slate-50`,
              `active:!bg-slate-100`,
              `active:!text-primary`,
              `focus:!bg-transparent`,
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
