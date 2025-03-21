import type { ReactNode } from 'react'
import { useRef } from 'react'
import { cls } from '@keg-hub/jsutils/cls'

export type TLightbox = {
  className?:string
  children?:ReactNode
}

const lbkey = `lightbox`
const lbhash = `#${lbkey}`

export const Lightbox = (props:TLightbox) => {
  const {
    children,
    className,
  } = props
  
  const hashRef = useRef<string>(``)
  
  const onClick = (evt:any) => {
    evt.stopPropagation()
    evt.preventDefault()

    if(window.location.hash === lbhash){
      window.location.hash = hashRef.current
      hashRef.current = ``
      return
    }

    hashRef.current = window.location.hash
    window.location.hash = lbkey
  }
  
  return (
    <>
      <a href={lbhash} onClick={onClick} >
        {children}
      </a>
      <div
        id={lbkey}
        onClick={onClick}
        className={cls(
          className,
          `hidden`,
          `p-10`,
          `fixed`,
          `z-20`,
          `inset-0`,
          `bg-black/75`,
          `target:block`,
          `overflow-auto`
        )}
      >
        {children}
      </div>
    </>
  )
  
}
