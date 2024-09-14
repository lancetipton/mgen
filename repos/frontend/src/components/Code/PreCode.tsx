
import type { ReactNode } from 'react'
import type { AllowElement, ExtraProps } from 'react-markdown'

import { isObj } from '@keg-hub/jsutils/isObj'

type MDElement = Parameters<AllowElement>[0]

export type TPreCode = ExtraProps & {
  children:ReactNode
}

export const PreCode = (props:TPreCode) => {
  const { node, children } = props
  const first = node.children?.[0]  

  return isObj<MDElement>(first) && first.tagName === `code`
    ? (<>{children}</>)
    : (<pre {...node.properties} >{children}</pre>)
}