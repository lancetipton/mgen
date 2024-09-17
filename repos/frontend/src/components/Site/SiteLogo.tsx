import { useEffect } from 'react'
import { useMGen } from '@MG/contexts/MGenContext'

export type TSiteLogo = {}


export const SiteLogo = (props:TSiteLogo) => {
  const {logo} = useMGen()

  // TODO: update the favicon with the correct logo
  //useEffect(() => {}, [logo])

  return (
    <a href={logo.href}>
      {logo?.svg ? (
        <div
          style={{
            background: logo?.svg,
            backgroundSize: `cover`,
            width: `${logo.width}px`,
            height: `${logo.height}px`,
          }}
        />
      ) : (
        <img className="w-auto h-7 min-w-7" src={logo.src} alt={logo.alt} />
      )}
    </a>
  )
}
