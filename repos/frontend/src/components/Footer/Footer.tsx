import { cls } from '@keg-hub/jsutils/cls'
import { isStr } from '@keg-hub/jsutils/isStr'
import { useMGen } from '@MG/contexts/MGenContext'
import { SiteLogo } from '@MG/components/Site/SiteLogo'
import { FooterNav } from '@MG/components/Footer/FooterNav'
import { useMemo } from 'react'

export type TFooter = {
  
}

export const Footer = (props:TFooter) => {

  const {site} = useMGen()

  const text = useMemo(() => {
    const start = site?.footer?.text || site?.name
    return !site?.footer?.year
      ? start
      : isStr(site?.footer?.year)
        ? `${start.trim()} ${site?.footer?.year}`
        : `${start.trim()} ${new Date().getFullYear()}`
  }, [site])
  


  return (
    <footer className={cls(
      `mg-footer`,
      `w-screen`,
      `bg-base-100`,
      `max-w-screen`,
      `z-10 fixed bottom-0`,
    )}
    >
        <div className={cls(
          `py-8`,
          `border-t`,
          `border-base-200`,
          `mx-auto`,
          `max-w-[90rem]`,
        )}>
            <div className="flex flex-col items-center sm:flex-row sm:justify-between px-8">

              <div className="flex items-center justify-between">
                {site?.footer?.logo !== false ? (<SiteLogo />) : null}
                <p className="text-sm ml-4">
                  {text}
                </p>
              </div>

              <FooterNav />
            </div>

        </div>
    </footer>
  )
}