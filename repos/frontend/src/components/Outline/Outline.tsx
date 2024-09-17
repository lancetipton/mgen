import type { TTOC } from '@MG/types'
import { cls } from '@keg-hub/jsutils/cls'
import { useLayoutEffect, useState, useTransition } from 'react'
import { useMGen } from '@MG/contexts/MGenContext'

export type TOutline = {
  
}

export const Outline = (props:TOutline) => {
  const { site, mg } = useMGen()
  
  const [toc, setToc] = useState<TTOC[]>([])
   const [isPending, startTransition] = useTransition();

  useLayoutEffect(() => {
    const offToc = mg?.on?.(mg.events.onToc, (toc:TTOC[]) => {
      startTransition(() => {
        setToc(toc)
      })
    })
    return () => {
      offToc?.()
    }
  }, [mg])

  if(!site?.dir) return null


  return (
    <div
      className={cls(
        `mg-sidebar`,
        `fixed`,
        `right-0`,
        `outline-width`,
        `overflow-x-hidden`,
        `overflow-y-auto`,
        `nav-height-offset`,
        `max-content-height`,
      )}
    >

      <aside
        className={cls(
          `mg-outline-aside`,
          `flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto`,
          `scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded`,
          `border-base-200 border-l rtl:border-l-0 rtl:border-l`
        )}
      >

        <div className="flex flex-col prose">
          <div>
            <h3 className="bold" >
              Outline
            </h3>
          </div>
          <ul>
            {toc?.map?.(item => {
              const { type, url, value } = item
              return (
                <li key={`${type}-${url}-${value}`} >
                  <a className='link link-hover' href={item.url || `#`} >
                    {value}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>

    </div>
  )
}