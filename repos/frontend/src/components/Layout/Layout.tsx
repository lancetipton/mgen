import type { ReactNode } from 'react'
import type { TSidebar } from '@MG/components/Sidebar'

import { useState } from 'react'
import { EBPSize } from '@MG/types'
import { cls } from '@keg-hub/jsutils/cls'
import { Steps } from '@MG/components/Steps'
import { Header } from '@MG/components/Header'
import { Footer } from '@MG/components/Footer'
import { Sidebar } from '@MG/components/Sidebar'
import { Outline } from '@MG/components/Outline'
import { MGContent } from '@MG/components/MGContent'
import { useBreakpoint } from '@MG/hooks/theme/useBreakpoint'

const mobileSizes = [EBPSize.sm, EBPSize.md]

export type TLayout = {
  className?:string
  children?:ReactNode
}

const Content = (props:TLayout & TSidebar) => {
  const {
    open,
    mobile,
    setOpen,
    children,
  } = props

  return (
    <>
      <div className={cls(
        `mg-content`,
        `sm:max-xl:w-full`,
        `content-center-offset`,
        `nav-height-offset`,
        `flex`,
      )}
      >
        <Sidebar mobile={mobile} open={open} setOpen={setOpen} />
        <Outline />
        {children || (<MGContent />)}
      </div>
    </>
  )
}

export const Layout = (props:TLayout) => {
  const { className } = props
  const breakpoint = useBreakpoint()
  const [open, setOpen] = useState<boolean>(false)
  const mobile = mobileSizes.includes(breakpoint)

  return (
    <div className={cls(
      `mg-layout`,
      className,
      `max-w-screen`,
      `flex flex-col min-h-screen w-screen`
    )} >
      <Header
        open={open}
        mobile={mobile}
        setOpen={setOpen}
      />
      <main
        id='mg-main-content'
        className={cls(
          `mg-layout-content`,
          `h-full flex items-stretch grow relative w-screen`
        )}
      >
        <Content
          {...props}
          open={open}
          mobile={mobile}
          setOpen={setOpen}
        />
      </main>
      <Footer />
    </div>
  )
}