import { cls } from '@keg-hub/jsutils/cls'
import { useMGen } from '@MG/contexts/MGenContext'
import { SiteLogo } from '@MG/components/Site/SiteLogo'
export type THeaderTitle = {}

export const HeaderTitle = (props:THeaderTitle) => {
  const {site, logo} = useMGen()

  return (
    <div className={cls(
      `mg-header-title`,
    )}
    >
      <a
        href={logo.href}
        aria-label={logo.alt}
        className={`flex items-center justify-between`}
      >
        <SiteLogo />
        <div className={cls(
          `mg-header-title-text`,
          `ml-4`,
          `whitespace-nowrap`,
          `text-base`,
          `sm:text-lg`,
        )}
        >
          {site?.name || `MGen`}
        </div>
      </a>
    </div>
  )
}