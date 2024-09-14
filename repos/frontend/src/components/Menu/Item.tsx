import { useState } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { Link } from '@MG/components/Link/Link'

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

  return (
    <Link
      href={url}
      onClick={(evt:any) => !url && children ? setOpen?.(!open) : onClick?.(evt, id, url)}
      className={cls(
        `mg-menu-item-text`,
        `no-underline`,
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
          <summary>
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
