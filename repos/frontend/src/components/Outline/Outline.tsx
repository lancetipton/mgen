import { cls } from '@keg-hub/jsutils/cls'
export type TOutline = {
  
}

export const Outline = (props:TOutline) => {
  
  return (
    <div
      className={cls(
        `mg-sidebar`,
        `fixed`,
        `right-0`,
        `outline-width`,
        `overflow-x-hidden`,
        `overflow-y-auto`,
        `nav-height-offset`,
        `max-content-height`,
      )}
    >

      <aside
        className={cls(
          `mg-outline-aside`,
          `flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto`,
          `scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded`,
          `border-base-200 border-l rtl:border-l-0 rtl:border-l`
        )}
      >

        <div className="flex flex-col justify-between flex-1">
          Outline
        </div>

      </aside>

    </div>
  )
}