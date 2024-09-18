import { cls } from '@keg-hub/jsutils/cls'

import { Menu } from '@MG/components/Menu/Menu'
import { useMGen } from '@MG/contexts/MGenContext'
import { useForceUpdate } from '@MG/hooks/components/useForceUpdate'

export type TSidebar = {}

export const Sidebar = (props:TSidebar) => {
  const { mg, site } = useMGen()
  const forceUpdate = useForceUpdate()
  
  if(!site?.dir) return null

  const onClick = (evt:any, id?:string, href?:string) => {
    evt.stopPropagation()
    evt.preventDefault()
    if(!href) return

    mg.navigate(href)
    forceUpdate()
  }

  return (
    <div
      className={cls(
        `mg-sidebar`,
        `fixed`,
        `left-0`,
        `side-bar-width`,
        `overflow-x-hidden`,
        `overflow-y-auto`,
        `scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded`,
        `nav-height-offset`,
        `max-content-height`,
      )}
    >

      <aside
        className={cls(
          `mg-sidebar-aside`,
          `border-base-200 border-r rtl:border-r-0 rtl:border-l `,
          `flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto`
        )}
      >
        <Menu
          onClick={onClick}
          items={site?.nav?.children}
        />
      </aside>

    </div>
  )
}
