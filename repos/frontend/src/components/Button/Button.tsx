import { cls } from '@keg-hub/jsutils/cls'
import type { ComponentProps, ReactElement } from 'react'

export const Button = ({
  children,
  className,
  ...props
}: ComponentProps<'button'>): ReactElement => {
  return (
    <button
      className={cls(
        `mgen-button transition-all active:opacity-50`,
        `rounded-md p-1.5`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
