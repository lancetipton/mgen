import type { TSiteConfig, TLogoMeta } from '@MG/types'

import Logo from '@MG/assets/logo.png'
import { toInt } from '@keg-hub/jsutils/toInt'

export const getSiteLogo = (site:TSiteConfig={} as TSiteConfig):TLogoMeta => {

  let height = toInt(site?.theme?.logo?.height || 28)
  let width = toInt(site?.theme?.logo?.width || height || 28)

  const logo = {
    href: site?.nav?.url || `/`,
    src: site?.logo?.url || Logo,
    width: (width > 28) ? 28 : width,
    height: (height > 28) ? 28 : height,
    alt: site?.logo?.alt || `${site.name || `MGen`} Docs`,
  }

return !site?.logo?.svg
  ? logo
  : {...logo, svg:`url("data:image/svg+xml,${encodeURIComponent(site?.logo?.svg)}")`}

}