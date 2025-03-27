import type { ExtraProps } from 'react-markdown'
import type { ReactNode, ComponentProps } from 'react'

import { cls } from '@keg-hub/jsutils/cls'
import { Lightbox } from '@MG/components/Lightbox'


export type TImage = ComponentProps<'img'> & ExtraProps & {
  fill?:boolean
  cover?:boolean
  scale?:boolean
  contain?:boolean
  children?:ReactNode
}
export const Image = (props:TImage) => {
  const {
    cover,
    fill,
    node,
    scale,
    contain,
    children,
    className,
    ...rest
  } = props

  return (
    <Lightbox>
      <img
        {...rest}
        className={cls(
          className,
          `cursor-pointer`,
          fill && `object-fill`,
          cover && `object-cover`,
          contain && `object-contain`,
          scale && `object-scale-down`,
        )}
      />
    </Lightbox>
  )

}