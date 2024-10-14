import { cls } from '@keg-hub/jsutils/cls'
import { Menu } from '@MG/components/Menu/Menu'
import { stopEvt } from '@MG/utils/dom/stopEvt'
import { ScrollBar } from '@MG/constants/classes'
import { useMGen } from '@MG/contexts/MGenContext'
import { useClickAway } from '@MG/hooks/components/useClickAway'
import { useForceUpdate } from '@MG/hooks/components/useForceUpdate'

export type TSidebar = {
  open?:boolean
  mobile?:boolean
  setOpen?:(status?:boolean) => void
}


export const Sidebar = (props:TSidebar) => {
  const {
    open,
    mobile,
    setOpen
  } = props

  const { mg, site, path } = useMGen()
  const forceUpdate = useForceUpdate()
  const ref = useClickAway(() => open && setOpen(false))

  if(!site?.dir) return null

  const onClick = (evt:any, id?:string, href?:string) => {
    stopEvt(evt)
    forceUpdate()
    href && mg.navigate(href)
  }

  const classes = mobile
    ? [!open && `hidden`, `absolute`, `drop-shadow-lg`, `left-0`]
    : [`hidden`, `lg:flex`, `sticky`, `sticky-content`, `nav-height-offset`]

  return (
    <div
      ref={ref}
      className={cls(
        `z-10`,
        `mg-sidebar`,
        `side-bar-width`,
        `bg-base-100`,
        ScrollBar,
        ...classes,
        `shrink-0`,
        `mr-4`,
      )}
    >

      <aside
        className={cls(
          `mg-sidebar-aside`,
          `pl-2`,
          `pt-3`,
          `w-64`,
          `h-screen`,
          `overflow-y-auto`,
          `flex flex-col`,
          mobile && `pr-4`,
        )}
      >
        <Menu
          path={path}
          onClick={onClick}
          items={site?.nav?.children}
        />
      </aside>

    </div>
  )
}
