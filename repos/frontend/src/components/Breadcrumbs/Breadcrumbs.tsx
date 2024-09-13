import { useMemo } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { isStr } from '@keg-hub/jsutils/isStr'
import { wordCaps } from '@keg-hub/jsutils/wordCaps'
import { eitherArr } from '@keg-hub/jsutils/eitherArr'

export type TBreadcrumbs = {
  ignore?:string[]
  capitalize?:boolean
  parts:string|string[]
  split?:string
}


const useParts = (props:TBreadcrumbs) => {
  return useMemo(() => {
    const parts = isStr(props.parts)
      ? props.parts.split(props.split || `/`)
      : eitherArr(props.parts, [])

    return parts.reduce((acc, part) => {
      const clean = part.trim()
      !props.ignore.includes(clean)
        && acc.push(props.capitalize ? wordCaps(part) : part)

      return acc
    }, [] as string[])

  }, [
    props.split,
    props.parts,
    props.ignore,
    props.capitalize
  ])
}

export const Breadcrumbs = (props:TBreadcrumbs) => {

  const parts = useParts(props)

  return (
    <div className={cls(`mg-breadcrumbs breadcrumbs text-sm`)}>
      <ul>
        {parts?.length && parts.map((part) => {
          return (
            <li key={part} >
              <a>{part}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
  
}