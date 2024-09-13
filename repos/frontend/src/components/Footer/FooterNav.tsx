
export type TFooterNav = {
  
}

export const FooterNav = (props:TFooterNav) => {

  return (
  <div className="mg-footer-nav flex mt-3 -mx-2 sm:mt-0">
    <a href="#" className="mx-2 text-sm" aria-label="Reddit"> Teams </a>

    <a href="#" className="mx-2 text-sm" aria-label="Reddit"> Privacy </a>

    <a href="#" className="mx-2 text-sm" aria-label="Reddit"> Cookies </a>
  </div>
  )

}