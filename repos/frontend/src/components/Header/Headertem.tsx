import { cls } from '@keg-hub/jsutils/cls'

export type THeaderItem = {
  href?:string
  text?:string
  className?:string
}

export const HeaderItem = (props:THeaderItem) => {
  const {
    href=`#`,
    text=href,
    className,
  } = props

  return (
    <a
      href={href}
      className={cls(
        className,
        `mg-header-item`,
        `px-2.5 py-2 rounded-lg md:mx-2`
      )}
    >
      {text}
    </a>
  )

}