import { Link } from '@MG/components/Link/Link'
import { useMGen } from '@MG/contexts/MGenContext'

export type TFooterNav = {}

export const FooterNav = (props:TFooterNav) => {
  const {site} = useMGen()

  return (
    <div className="mg-footer-nav flex mt-3 -mx-2 sm:mt-0">
      {site?.footer?.links?.map(link => {
        const text = link.text || link.url

        return link.url && (
          <Link
            key={`${link.url}-${text}`}
            href={link.url}
            className="mx-2 text-sm link-hover"
            aria-label={link.text}
            > {text} </Link>
        ) || null
      })}
    </div>
  )
}