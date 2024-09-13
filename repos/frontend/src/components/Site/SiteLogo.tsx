import { useMemo } from 'react'
import Logo from '@MG/assets/logo.png'
import { useMGen } from '@MG/contexts/MGenContext'

export type TSiteLogo = {}

export const SiteLogo = (props:TSiteLogo) => {
  
  const {site} = useMGen()

  const {src, alt, href} =useMemo(() => {
    return {
      href: site?.nav?.url || `/`,
      src: site?.logo?.url || Logo,
      alt: site?.logo?.alt || `MGen Docs`,
    }
    
  }, [
    site?.nav?.url,
    site?.logo?.url,
    site?.logo?.alt
  ])

  return (
    <a href={href}>
      <img className="w-auto h-7 min-w-7" src={src} alt={alt} />
    </a>
  )
}
