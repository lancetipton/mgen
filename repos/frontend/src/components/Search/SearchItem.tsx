import type { TSearchDoc } from '@MG/types'
import { useMemo } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { HighlightMatches } from '@MG/components/Search/HighlightMatches'



export type TSearchItem = {
  query?:string
  item:TSearchDoc
}

export const SearchItem = (props:TSearchItem) => {

  const {
    item,
    query
  } = props

  const content = useMemo(() => {

    const start = item.text.split(`\n`)
      .reduce((acc, line) => {
        if(line.toLowerCase().includes(query.toLowerCase())){
          line.startsWith(`#`) || line.startsWith(`*`)
            ? acc.push(`${line}\n`)
            : acc.push(line)
        }

        return acc
      }, [] as string[])
      .slice(0, 10)
      .join(`\n`)
      

    return start

  }, [item.text, query])

  return (
    <li 
      className={cls(
        `mg-search-item`,
        `pb-2`,
        `w-full`,
        `overflow-hidden`,
      )}
    >
      <a
        href={item.url}
        className={cls(
          `mg-search-item-link`,
          `w-full`,
          `p-3`,
          `block`,
          `overflow-hidden`,
        )}
      >
        <div
          className={cls(
            `mg-search-item-content`,
            `flex flex-col`,
            `gap-2`,
            `w-full`,
          )}
        >
          <label
            className={cls(
              `font-bold`,
              `text-sm`,
              `border-b`,
              `w-full`,
              `border-neutral`,
              `pb-1`
            )}
          >
            {item.url}
          </label>
          <pre
            className={cls(
              `mt-1`,
              `p-2`,
              `pt-0`,
              `text-sm`,
              `w-full`,
              `text-ellipsis`,
              `overflow-hidden`,
            )}
          >
            <HighlightMatches match={query} value={content} />
          </pre>
        </div>
      </a>
    </li>
  )
  
}