import type { TSearchDoc } from '@MG/types'

import { cls } from '@keg-hub/jsutils/cls'
import { SearchItem } from '@MG/components/Search/SearchItem'
import { useTheme } from '@MG/contexts/ThemeContext'


export type TResults = {
  open?:boolean
  query?:string
  items:TSearchDoc[]
}

const NoItem = {
  path: ``,
  id: `No Items`,
  text: `No matching results found`
}

export const Results = (props:TResults) => {
  
  const {
    open,
    items,
    query,
  } = props
  
  const { isDark } = useTheme()


  return (
      <div className={cls(
        `dropdown`,
        `dropdown-left`,
        `w-full`,
        open && `dropdown-open`,
      )}>
        <ul
          tabIndex={0}
          className={cls(
            `mg-search-results-container`,
            `p-2`,
            `menu`,
            `z-[1]`,
            `gap-2`,
            `drop-shadow`,
            `rounded-sm`,
            `border`,
            `border-neutral`,
            `dropdown-content`,
            isDark ? `bg-base-200` : `bg-base-100`,

            `left-0`,
            `!fixed`,
            `w-screen`,
            `!top-[65px]`,
            `md:max-w-[min(calc(100vw-2rem),calc(100%+20rem))]`,
            `md:!absolute`,
            `md:!top-[-4px]`,
            `md:!left-[-24rem]`,

          )}
        >
          {items.map(item => {
            return (
              <SearchItem
                item={item}
                key={item.id}
                query={query}
              />
            )
          })}
          {!items?.length && (
            <SearchItem
              query={``}
              item={NoItem}
              key={NoItem.id}
            />
          ) || null}
        </ul>
      </div>
  )

}