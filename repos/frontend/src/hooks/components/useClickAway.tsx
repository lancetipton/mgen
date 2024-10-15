import { useRef, useCallback, useEffect } from 'react'
import { useInline } from '@MG/hooks/components/useInline'

export const useClickAway = (callback:(evt:any) => any) => {

  const ref = useRef(null)
  const cb = useInline(callback)

  useEffect(() => {
    const handler = (evt:any) => {
      ref.current
        && !ref.current.contains(evt.target)
        && cb?.(evt)
    }

    document.addEventListener(`mousedown`, handler)
    document.addEventListener(`touchstart`, handler)

    return () => {
      document.removeEventListener(`mousedown`, handler)
      document.removeEventListener(`touchstart`, handler)
    }
  }, [])

  return ref
}

export const onForceClick = () => {
  document.body.dispatchEvent(new MouseEvent(`mousedown`, {
    bubbles: true,
    cancelable: true
  }))
}