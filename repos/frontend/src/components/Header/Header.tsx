import type { THeaderMobile } from '@MG/components/Header/HeaderMobile'

import { cls } from '@keg-hub/jsutils/cls'
import { HeaderTitle } from '@MG/components/Header/HeaderTitle'
import { HeaderMobile } from '@MG/components/Header/HeaderMobile'
import { HeaderSearch } from '@MG/components/Header/HeaderSearch'


export type THeader = THeaderMobile & {
  mobile?:boolean
}

export const Header = (props:THeader) => {
  const { mobile, open, setOpen } = props

  return (
    <header
      id='mg-header'
      className={cls(
        `mg-header`,
        `z-20`,
        `fixed`,
        `top-0`,
        `w-screen`,
        `border-b`,
        `bg-base-100`,
        `max-w-screen`,
        `border-base-200`,
        `h-[var(--mgen-header-height)]`
      )}
    >
      <div className="mg-header-container navbar w-full py-3 px-4 max-w-[90rem] mx-auto">

        {mobile && (
          <div className='mg-header-left navbar-start flex items-center justify-between w-2/6'>
            <HeaderMobile open={open} setOpen={setOpen} />
          </div>
        ) || null}

        <div
          className={cls(
            `mg-header-center`,
            `flex`,
            `mr-4`,
            `items-center`,
            `justify-between`,
            mobile ? `navbar-center` : `navbar-start`,
          )}
        >
          <HeaderTitle />
        </div>

        <div 
          className={cls(
            `mg-header-right`,
            `navbar-end`,
            `z-20 mt-0 p-0 `,
            `flex items-center justify-end`
          )}
          >
            <HeaderSearch />
        </div>

      </div>
    </header>

  )
}
