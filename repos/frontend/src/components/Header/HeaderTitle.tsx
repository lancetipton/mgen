import { cls } from '@keg-hub/jsutils/cls'
import { useMGen } from '@MG/contexts/MGenContext'
import { SiteLogo } from '@MG/components/Site/SiteLogo'
export type THeaderTitle = {}

export const HeaderTitle = (props:THeaderTitle) => {
  const {site} = useMGen()

  return (
    <div className={cls(
      `mg-header-title`,
      `flex items-center justify-between`,
    )}
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
    </div>
  )
  
} 