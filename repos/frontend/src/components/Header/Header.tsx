import { useState } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { HeaderNav } from '@MG/components/Header/HeaderNav'
import { HeaderTitle } from '@MG/components/Header/HeaderTitle'
import { HeaderMobile } from '@MG/components/Header/HeaderMobile'
import { HeaderSearch } from '@MG/components/Header/HeaderSearch'


export type THeader = {}

export const Header = (props:THeader) => {

  const [open, setOpen] = useState(false)

  return (
  <header className={cls(
    `mg-header`,
    `w-screen`,
    `max-w-screen`,
    `border-b`,
    `bg-base-100`,
    `border-base-200`,
    `z-10 fixed top-0`
  )}>
    <div className="mg-header-container navbar w-full py-3 px-8 md:flex">

      <div className='mg-header-left flex items-center justify-between'>
        <HeaderTitle />
        <HeaderMobile open={open} setOpen={setOpen} />
      </div>

      <div 
        className={cls(
          `mg-header-right`,
          `z-20 w-full mt-0 p-0 `,
          `flex items-center justify-between`
        )}
        >
          <HeaderNav />
          <HeaderSearch />
      </div>

    </div>
  </header>

  )
}
