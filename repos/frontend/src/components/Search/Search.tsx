import type { TSearchIdx, TSearchSections } from '@MG/types'

import { useEffect, useState } from 'react'
import { ife } from '@keg-hub/jsutils/ife'
import { cls } from '@keg-hub/jsutils/cls'
import { useMGen } from '@MG/contexts/MGenContext'
import { Results } from '@MG/components/Search/Results'
import { useClickAway } from '@MG/hooks/components/useClickAway'

export type TSearch = {}

export const Search = (props:TSearch) => {
  const { site } = useMGen()
  
  const [off, setOff] = useState(false)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState<string>()
  const [index, setIndex] = useState<TSearchIdx>()
  const [sections, setSections] = useState<TSearchSections>([])
  const ref = useClickAway(() => {
    if(!open) return
    
    setOpen(false)
    setOff(true)
  })

  const onSearch = async (evt:any) => {
    // Handle the onBlur event when input focused and click away is fired
    if(off) return setOff(false)
    
    const query = evt.target.value.trim()
    if(query.length < 3){
      setQuery(undefined)
      return setSections([])
    }

    const sections = await site.search.query(query)
    setQuery(query)
    setSections(sections)
    setOpen(true)
  }

  const onKeyDown = (evt:any) => {
    evt.keyCode === 13 && evt?.target?.blur()
    evt.keyCode === 27 && open && setOpen(false)
  }

  const onFocus = (evt:any) => {
    evt?.target?.select?.()
    setOpen(true)
    setOff(false)
  }


  useEffect(() => {
    if(!site?.dir || !site?.search || index) return
    
    ife(async () => {
      const idx = await site.search.load()
      idx && setIndex(idx)
    })

  }, [site, index])


  return site?.dir && site?.search && (
    <>
      <div className='flex flex-col' >
        <div className="mg-search relative mt-0 ml-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              />
            </svg>
          </span>

          <input
            type="text"
            placeholder="Search"
            onFocus={onFocus}
            onBlur={onSearch}
            onKeyDown={onKeyDown}
            className={cls(
              `mg-header-search-input`,
              `pr-4`,
              `py-1`,
              `pl-10`,
              ` w-full`,
              `h-[2.5rem]`,
              `rounded-lg`,
              `input`,
              `input-bordered`,
            )}
          />

        </div>
        <div
          ref={ref}
          className={cls(
            `mg-search-results-container`,
            `w-full`,
            `relative`,
            `h-0`,
          )}
          >
          <Results
            open={open}
            query={query}
            sections={sections}
          />
        </div>
      </div>
    </>
  )

}