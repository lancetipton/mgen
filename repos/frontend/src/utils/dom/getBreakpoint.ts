import { EBPSize } from '@MG/types'


export const getBreakpoint = (): EBPSize => {
  return Object.values(EBPSize).find(size => {
    if(size === EBPSize.unknown) return null
    return document.getElementById(`breakpoint-${size}`)?.offsetParent === null ? null : size
  }) ?? EBPSize.unknown
}