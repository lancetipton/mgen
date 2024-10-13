import { cls } from '@keg-hub/jsutils/cls'
import { SiteLogo } from '@MG/components/Site/SiteLogo'
import { FooterNav } from '@MG/components/Footer/FooterNav'

export type TFooter = {
  
}

export const Footer = (props:TFooter) => {

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
                <SiteLogo />
                <p className="text-sm ml-4">© Copyright 2024. All Rights Reserved.</p>
              </div>

              <FooterNav />
            </div>

        </div>
    </footer>
  )
}