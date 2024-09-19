import { useMemo } from 'react'
import { useResize } from '@MG/hooks/theme/useResize'
import { getBreakpoint } from "@MG/utils/dom/getBreakpoint"

export const useBreakpoint = () => {
  const {width} = useResize()
  return useMemo(() => getBreakpoint(), [width])
}