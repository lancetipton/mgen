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
    if(current === active) return

    const hash = active ? `#${active}` : ``

    history.pushState(null, null, window.location.pathname + hash + window.location.search)
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

    const endOfPage = () => {
      const winH = window.innerHeight + window.pageYOffset
      const bodyOffH = document.body.offsetHeight

      if (winH >= bodyOffH) {
        const last = elements[elements.length - 1]
        last?.id
          && active !== last?.id
          && setActive(last?.id)
      }
    }
    window.addEventListener(`scroll`, endOfPage)

    observer.current = new IntersectionObserver((entries) => {
      if(entries?.length > 1) return
      
      const entry = entries[0] as any

      if(!entry.isVisible && !entry.isIntersecting){

        if(!entry?.rootBounds) return

        if(entry?.boundingClientRect?.top < entry?.rootBounds?.height)
          return setActive(entry.target.id)

        const idx = elements.findIndex(element => element === entry.target)
        const prev = elements[idx - 1]
        active !== prev?.id
          && setActive(prev?.id || ``)

      }
      else if(!entry.isVisible && entry.isIntersecting){
        if(!entry?.rootBounds || entry.boundingClientRect?.top >= entry?.rootBounds?.height)
          return

        const idx = elements.findIndex(element => element === entry.target)
        const prev = elements[idx - 1]
        !prev && setActive(``)

      }
    }, {
      rootMargin: `-20% 0px -20%`,
    })

    elements = toc.map(item => {
      const element = document.getElementById(item.id)

      if(!element) return
      observer.current.observe(element)
      return element
    })

    return () => {
      window.removeEventListener(`scroll`, endOfPage)
      elements.forEach((element) => element && observer.current.unobserve(element))
    }

  }, [toc, active])

  return {
    active,
    setActive
  }

}

