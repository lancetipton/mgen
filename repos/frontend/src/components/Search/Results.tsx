import type { TSearchDoc, TSearchSections, TSearchSection } from '@MG/types'

import { Fragment } from 'react'
import { cls } from '@keg-hub/jsutils/cls'

import { useTheme } from '@MG/contexts/ThemeContext'
import { SearchItem } from '@MG/components/Search/SearchItem'
import { SectionHeader } from '@MG/components/Search/SectionHeader'

export type TResults = {
  open?:boolean
  query?:string
  sections:TSearchSections
  onClick?:(evt:any) => void
}

const NoItem = {
  path: ``,
  url: `#`,
  id: `No Items`,
  title: `No Items`,
  text: `No matching results found`
}

const classes = {
  dropdown: [
    `w-full`,
    `dropdown`,
    `dropdown-left`,
  ],
  container: [
    `mg-search-results-container`,
    `dropdown-content`,
    `z-[1]`,
    `border`,
    `left-0`,
    `!fixed`,
    `w-screen`,
    `drop-shadow`,
    `rounded-xl`,
    `!top-[65px]`,
    `md:!absolute`,
    `md:!top-[-4px]`,
    `md:!left-[-20rem]`,
    `md:max-w-[min(calc(100vw-2rem),calc(100%+20rem))]`,
  ],
  ul: [
    `mg-search-results-list`,
    `menu`,
    `px-1`,
    `py-3`,
    `rounded-xl`,
    `flex-nowrap`,
    `max-h-screen`,
    `max-h-[calc(100vh-var(--mgen-header-height))]`,
    `md:max-h-[75vh]`,
    `overflow-y-auto`,
    `overflow-x-hidden`,
  ]
}


export const Results = (props:TResults) => {
  
  const {
    open,
    query,
    onClick,
    sections,
  } = props

  const { isDark } = useTheme()
 
  return (
      <div
        className={cls(
          ...classes.dropdown,
          query && open ? `dropdown-open` : `hidden`,
        )}
      >
      <div
        className={cls(
          ...classes.container,
          isDark ? `border-neutral` : `border-base-200`,
        )}
      >
        <ul
          tabIndex={0}
          className={cls(
            ...classes.ul,
            isDark ? `bg-base-200` : `bg-base-100`,
          )}
        >
          {sections.map(section => {
            return (
              <Fragment key={section.id} >
                <SectionHeader
                  isDark={isDark}
                  section={section}
                  onClick={onClick}
                />
                {section.items.map(item => {
                  return (
                    <SearchItem
                      item={item}
                      key={item.id}
                      query={query}
                      onClick={onClick}
                    />
                  )
                })}
              </Fragment>
            )
          })}
          {!sections?.length && (
              <SearchItem
                query={``}
                item={NoItem}
                key={NoItem.id}
              />
          ) || null}
          </ul>
      </div>
      </div>
  )

}
