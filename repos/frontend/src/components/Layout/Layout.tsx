import type { ReactNode } from 'react'

import { cls } from '@keg-hub/jsutils/cls'
import { Header } from '@MG/components/Header'
import { Footer } from '@MG/components/Footer'
import { useMD } from '@MG/contexts/MDContext'
import { Sidebar } from '@MG/components/Sidebar'
import { Outline } from '@MG/components/Outline'
import { MGContent } from '@MG/components/MGContent'


export type TLayout = {
  className?:string
  children?:ReactNode
}

const Content = (props:TLayout) => {
  const { children } = props

  return (
    <>
      <Sidebar />
      {children || (<MGContent />)}
      <Outline />
    </>
  )
}

export const Layout = (props:TLayout) => {
  const { className } = props

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
        <Content {...props} />
      </main>
      <Footer />
    </div>
  )
}