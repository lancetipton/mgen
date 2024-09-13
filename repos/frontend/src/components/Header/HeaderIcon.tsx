import Logo from '@MG/assets/logo.png'

export type THeaderIcon = {
  src?:string
  alt?:string
  href?:string
}

export const HeaderIcon = (props:THeaderIcon) => {
  const {src=Logo, alt=`mgen docs`, href=`/`} = props

  return (
    <a href={href}>
      <img className="w-auto h-7 min-w-7" src={src} alt={alt} />
    </a>
  )
}