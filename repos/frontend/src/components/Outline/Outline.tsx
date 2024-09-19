import type { TTOC } from '@MG/types'
import { cls } from '@keg-hub/jsutils/cls'
import { Link } from '@MG/components/Link'
import { useEffect, useState } from 'react'
import { useMGen } from '@MG/contexts/MGenContext'
import { useTheme } from '@MG/contexts/ThemeContext'
import { trainCase } from '@keg-hub/jsutils/trainCase'

export type TOutline = {}

const getHash = (hash?:string) => trainCase((hash || ``).replace(`#`, ``))


const useActive = () => {
  const [active, setActive] = useState<string>(getHash(window.location.hash))
  return {active, setActive}
}

export const Outline = (props:TOutline) => {
  const { site, mg } = useMGen()

  const { isDark } = useTheme()
  const {active, setActive} = useActive()
  const [toc, setToc] = useState<TTOC[]>([])

  useEffect(() => {
    if(!mg) return

    const offToc = mg?.on?.(mg.events.onToc, (toc:TTOC[]) => setToc(toc))
    const offRoute = mg?.on(mg.events.onRoute, () => setActive(getHash(window.location.hash)))

    return () => {
      offToc?.()
      offRoute?.()
    }

  }, [mg])


  if(!site?.dir) return null

  return (
    <div
      className={cls(
        `hidden`,
        `xl:flex`,
        `sticky`,
        `shrink-0`,
        `mg-sidebar`,
        `outline-width`,
        `nav-height-offset`,
        `sticky-content`,
      )}
    >

      <aside
        className={cls(
          `mg-outline-aside`,
          `flex flex-col w-64 h-screen px-6 pt-5 pb-8 overflow-y-auto`,
          `scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded`,
        )}
      >

        <div className='flex flex-col prose'>
          <div >
            <h4 className={cls(
              `mt-0 bold`,
              isDark ? `text-gray-300` : `text-gray-600`,
            )}
            >
              On This Page
            </h4>
          </div>
          <ul className='list-none pl-0 mt-1' >
            {toc?.map?.(item => {
              const { type, url, value } = item

              return (
                <li className='mt-1 mb-0 pl-0'  key={`${type}-${url}-${value}`} >
                  <Link
                    href={item.url || `#`}
                    onClick={(evt:any) => setActive((value || ``).toLowerCase())}
                    className={cls(
                      `no-underline`,
                      `opacity-70`,
                      `!text-sm`,
                      `leading-none`,
                      `hover:opacity-100`,
                      `hover:text-info`,
                      `text-gray-500`,
                      active === getHash(value) && `text-info`,
                    )}
                  >
                    {value}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>

    </div>
  )
}