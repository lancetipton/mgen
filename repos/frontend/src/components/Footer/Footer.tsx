import { cls } from '@keg-hub/jsutils/cls'
import { FooterNav } from '@MG/components/Footer/FooterNav'
import { FooterIcon } from '@MG/components/Footer/FooterIcon'

export type TFooter = {
  
}

export const Footer = (props:TFooter) => {
  
  return (
    <footer className={cls(
      `mg-footer`,
      `bg-white`,
      `w-screen`,
      `max-w-screen`,
      `dark:bg-gray-900 z-10 fixed bottom-0`
    )}
    >
        <div className="pb-8">

            <hr className="mb-8 border-gray-200 dark:border-gray-700" />

            <div className="flex flex-col items-center sm:flex-row sm:justify-between px-8">

              <div className="flex items-center justify-between">
                <FooterIcon />
                <p className="text-sm text-gray-500 ml-4">© Copyright 2024. All Rights Reserved.</p>
              </div>

              <FooterNav />
            </div>

        </div>
    </footer>
  )
}