import Logo from '@MG/assets/logo.png'

export type TFooterIcon = {
  
}

export const FooterIcon = (props:TFooterIcon) => {
  return (
    <a href="#">
      <img className="w-auto h-6 sm:h-7" src={Logo} alt="mgen docs" />
    </a>
  )
}