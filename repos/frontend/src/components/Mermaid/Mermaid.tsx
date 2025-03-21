import type { ReactNode } from 'react'

import { cls } from '@keg-hub/jsutils/cls'
import { useTheme } from '@MG/contexts/ThemeContext'
import { Lightbox } from '@MG/components/Lightbox'

export type TMermaid = {
  className?:string
  children?:ReactNode
}



export const Mermaid = (props:TMermaid) => {
  const {
    children,
    className,
  } = props
  
  const { isDark } = useTheme()
  
  return (
    <Lightbox>
      <div
        className={cls(
          className,
          `mg-mermaid`,
          isDark ? `bg-[#1E1E1E]` : `!bg-[#F9FBFE]`,
          `!py-5`,
          `scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded`
        )}
      >
        {children}
      </div>
    </Lightbox>
  )
  
}
