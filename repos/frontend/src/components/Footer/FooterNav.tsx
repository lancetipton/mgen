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
            href={link.url}
            aria-label={link.text}
            key={`${link.url}-${text}`}
            target={link?.target || `_blank`}
            className="mx-2 text-sm link-hover"
            > {text} </Link>
        ) || null
      })}
    </div>
  )
}