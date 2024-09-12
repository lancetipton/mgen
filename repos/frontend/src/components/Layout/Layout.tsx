import type { ReactNode } from 'react'

import { cls } from '@keg-hub/jsutils/cls'
import { Header } from '@MG/components/Header'
import { Footer } from '@MG/components/Footer'
import { Sidebar } from '@MG/components/Sidebar'
import { Outline } from '@MG/components/Outline'

export type TLayout = {
  className?:string
  children?:ReactNode
}

export const Layout = (props:TLayout) => {
  const {
    className,
    children
  } = props

  return (
    <div className={cls(
      `mg-layout`,
      className,
      `max-w-screen`,
      `flex flex-col min-h-screen w-screen`
    )} >
      <Header />
      <main
        className={cls(
          `mg-layout-content`,
          `h-full flex items-stretch grow relative w-screen`
        )}
      >
        <Sidebar />
        {children}
      </main>
      <Outline />
      <Footer />
    </div>
  )
}