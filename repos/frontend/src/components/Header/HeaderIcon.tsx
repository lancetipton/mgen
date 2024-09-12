import Logo from '@MG/assets/logo.png'

export type THeaderIcon = {
  
}

export const HeaderIcon = (props:THeaderIcon) => {

  return (
    <a href="#">
      <img className="w-auto h-6 sm:h-7" src={Logo} alt="mgen docs" />
    </a>
  )

}