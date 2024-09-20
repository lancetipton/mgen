import type { TTOC } from '@MG/types'

import { getHash } from '@MG/utils/api/getHash'
import { useState, useEffect, useRef } from 'react'



export type THActiveScroll = {
  toc?:TTOC[]
}

const useActive = () => {
  const [active, setActive] = useState<string>(getHash(window.location.hash))
  
  useEffect(() => {
    if(!history.pushState) return

    const current = window.location.hash
    current !== active && history.pushState(null, null, `#${active}`)
  }, [active])

  return {active, setActive}
}

export const useActiveScroll = (props:THActiveScroll) => {
  const { toc } = props
  const {active, setActive} = useActive()

  const observer = useRef(null)

  useEffect(() => {
    if(!toc) return

    let elements:any[] = []

    observer.current = new IntersectionObserver((entries) => {
      if(entries?.length > 1) return
      
      const entry = entries[0] as any

      if(!entry.isVisible && !entry.isIntersecting)
        setActive(entry.target.id)

      else if(!entry.isVisible && entry.isIntersecting){
        const idx = elements.findIndex(element => element === entry.target)
        const prev = elements[idx - 1]
        prev && setActive(prev.id)
      }
    }, {
      rootMargin: `-120px 0px 100px`,
    })

    elements = toc.map(item => {
      const element = document.getElementById(getHash(item.value))
      if(!element) return
      observer.current.observe(element)
      return element
    })

    return () => {
      elements.forEach((element) => element && observer.current.unobserve(element))
    }

  }, [toc])

  return {
    active,
    setActive
  }

}

