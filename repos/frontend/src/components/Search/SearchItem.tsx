import type { TSearchDoc } from '@MG/types'
import { useMemo } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { HighlightMatches } from '@MG/components/Search/HighlightMatches'


export type TSearchItem = {
  query?:string
  item:TSearchDoc
  onClick?:(evt:any) => void
}

export const SearchItem = (props:TSearchItem) => {

  const {
    item,
    query,
    onClick
  } = props

  const content = useMemo(() => {
    const text = item.text.split(`\n`)
      .reduce((acc, line) => {
        if(line.toLowerCase().includes(query.toLowerCase())){
          line.startsWith(`#`) || line.startsWith(`*`)
            ? acc.push(`${line}\n`)
            : acc.push(line)
        }

        return acc
      }, [] as string[])
      .join(`\n`)

    return text

  }, [item.text, query])



  return (
    <li 
      className={cls(
        `mg-search-item`,
        `w-full`,
        `mb-2`,
        `px-4`,
        `overflow-hidden`,
      )}
    >
      <a
        href={item.url}
        onClick={onClick}
        className={cls(
          `mg-search-item-link`,
          `w-full`,
          `px-4`,
          `block`,
          `overflow-hidden`,
          `hover:text-primary`,
        )}
      >
        <div
          className={cls(
            `mg-search-item-content`,
            `flex flex-col`,
            `w-full`,
          )}
        >
          <span
            className={cls(
              `pb-1`,
              `font-bold`,
              `text-sm`,
              `w-full`,
              `text-ellipsis`,
              `overflow-hidden`,
              `whitespace-nowrap`,
            )}
          >
            {item.title}
          </span>
          <pre
            className={cls(
              `px-3`,
              `text-xs`,
              `w-full`,
              `text-ellipsis`,
              `text-base-content`,
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