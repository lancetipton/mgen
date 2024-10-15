import { useMemo } from 'react'
import { Link } from '@MG/components/Link'
import { useMGen } from '@MG/contexts/MGenContext'
import { EditIcon } from '@MG/components/Icons/EditIcon'

const styles = {
  icon: {
    height: `14px`,
    width: `14px`,
    marginRight: `4px`,
    display: `inline-block`,
  },
  container: {
    display: `flex`,
    alignItems: `center`,
  }
}

export type TEditLink = {
  location?:string
}


export const EditLink = (props:TEditLink) => {
  const {site} = useMGen()

  const { location } = props

  const editUrl = useMemo(() => {
    if(location) return location
    if(!site?.dir || !site?.edit?.url) return ``

    const loc = site?.sitemap[window.location.pathname]
    const cleaned = loc.replace(`/${site?.dir}`, ``).replace(/^\//, ``)
    const part = site?.edit?.map?.[cleaned] || cleaned

    return `${site?.edit?.url}/${part}`
  }, [
    site,
    location,
    window.location.pathname
  ])

  return editUrl && (
    <Link
      href={editUrl}
      target='_blank'
      className='flex items-center no-underline opacity-40 hover:opacity-100'
    >
      <EditIcon className='text-current' style={styles.icon} />
      <span className='text-sm' style={styles.container} >
        {site?.edit?.text}
      </span>
    </Link>
  )
}


