
import { cls } from '@keg-hub/jsutils/cls'


export type TDivider = {
  className?:string
  divClass?:string
}


export const Divider = (props:TDivider) => {
  
  const { className, divClass } = props
  
  return (
    <div
      className={cls(
        `mg-divider-container`,
        className || `flex w-full flex-col`,
      )}
    >
      <div
        className={cls(
          `mg-divider`,
          `divider`,
          divClass
        )}
      />
    </div>
  )
  
}