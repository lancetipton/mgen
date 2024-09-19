import { useLayoutEffect, useState } from "react"
import { useInline } from '@MG/hooks/components/useInline'
import { throttleLast } from '@keg-hub/jsutils/throttleLast'
 
export const useResize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  const handleSize = throttleLast(useInline(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }), 500)

  useLayoutEffect(() => {
    handleSize()
    window.addEventListener(`resize`, handleSize)

    return () => window.removeEventListener(`resize`, handleSize)
  }, [])

  return size
}

