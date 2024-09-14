import { Link } from '@MG/components/Link/Link'

export type TFooterNav = {
  
}

export const FooterNav = (props:TFooterNav) => {

  return (
  <div className="mg-footer-nav flex mt-3 -mx-2 sm:mt-0">
    <Link href="#" className="mx-2 text-sm link-hover" aria-label="Reddit"> Teams </Link>

    <Link href="#" className="mx-2 text-sm link-hover" aria-label="Reddit"> Privacy </Link>

    <Link href="#" className="mx-2 text-sm link-hover" aria-label="Reddit"> Cookies </Link>
  </div>
  )

}