import { cls } from '@keg-hub/jsutils/cls'
import { Menu } from '@MG/components/Menu/Menu'
import { stopEvt } from '@MG/utils/dom/stopEvt'
import { useMGen } from '@MG/contexts/MGenContext'
import { useForceUpdate } from '@MG/hooks/components/useForceUpdate'

export type TSidebar = {}

export const Sidebar = (props:TSidebar) => {
  const { mg, site } = useMGen()
  const forceUpdate = useForceUpdate()

  if(!site?.dir) return null

  const onClick = (evt:any, id?:string, href?:string) => {
    stopEvt(evt)
    forceUpdate()
    href && mg.navigate(href)
  }

  return (
    <div
      className={cls(
        `mg-sidebar`,
        `hidden`,
        `lg:flex`,
        `sticky`,
        `side-bar-width`,
        `shrink-0`,
        `scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded`,
        `nav-height-offset`,
        `sticky-content`,
        `mr-4`,
      )}
    >

      <aside
        className={cls(
          `mg-sidebar-aside`,
          `flex flex-col w-64 h-screen pt-3 overflow-y-auto`
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
