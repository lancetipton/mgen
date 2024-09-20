
import type { TIcon } from '@MG/components/Icons/Icon'
import { cls } from '@keg-hub/jsutils/cls'

export const ChevronLeftIcon = (props:TIcon) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={props.fill || `none`}
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={props.strokeWidth || 1.5}
      stroke={props.stroke ||  `currentColor`}
      className={cls(`size-6`, props.className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  )
}

