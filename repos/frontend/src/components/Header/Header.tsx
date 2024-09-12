import { useState } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { HeaderNav } from '@MG/components/Header/HeaderNav'
import { HeaderIcon } from '@MG/components/Header/HeaderIcon'
import { HeaderMobile } from '@MG/components/Header/HeaderMobile'
import { HeaderSearch } from '@MG/components/Header/HeaderSearch'


export type THeader = {
  
}

export const Header = (props:THeader) => {
  
  const [open, setOpen] = useState(false)
  

  return (
  <header className={cls(
    `mg-header`,
    `bg-white`,
    `w-screen`,
    `max-w-screen`,
    `shadow dark:bg-gray-800 z-10 fixed top-0`
  )}>
    <div className='mg-header-container py-3 px-8 md:flex'>

      <div className='mg-header-left flex items-center justify-between'>
        <HeaderIcon />
        <HeaderMobile open={open} setOpen={setOpen} />
      </div>

      <div 
        className={cls(
          open ? `translate-x-0 opacity-100` : `opacity-0 -translate-x-full`,
          `mg-header-right absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between`
        )}
        >
          <HeaderNav />
          <HeaderSearch />
      </div>

    </div>
  </header>

  )
}

