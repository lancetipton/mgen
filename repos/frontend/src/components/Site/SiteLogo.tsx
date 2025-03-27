import { useMGen } from '@MG/contexts/MGenContext'

export type TSiteLogo = {}


export const SiteLogo = (props:TSiteLogo) => {
  const {logo} = useMGen()

  return logo?.svg ? (
    <div
      role='img'
      // @ts-ignore
      alt={logo.alt}
      title={logo.alt}
      style={{
        background: logo?.svg,
        backgroundSize: `cover`,
        width: `${logo.width}px`,
        height: `${logo.height}px`,
      }}
    />
  ) : (
    <img
      src={logo.src}
      alt={logo.alt}
      className='w-auto h-7 min-w-7'
    />
  )
}
