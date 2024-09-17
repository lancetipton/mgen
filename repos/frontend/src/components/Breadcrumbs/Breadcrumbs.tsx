import { useMemo } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { isStr } from '@keg-hub/jsutils/isStr'
import { Link } from '@MG/components/Link/Link'
import { useMGen } from '@MG/contexts/MGenContext'
import { wordCaps } from '@keg-hub/jsutils/wordCaps'
import { useTheme } from '@MG/contexts/ThemeContext'
import { eitherArr } from '@keg-hub/jsutils/eitherArr'

export type TBreadcrumbs = {
  split?:string
  ignore?:string[]
  capitalize?:boolean
  parts:string|string[]
  map?:Record<string, string>
}

type TPart = {
  text:string
  href:string
  disabled?:boolean
}

const useParts = (props:TBreadcrumbs) => {
  const { site } = useMGen()

  return useMemo(() => {
    const parts = isStr(props.parts)
      ? props.parts.split(props.split || `/`)
      : eitherArr(props.parts, [])

    const collect = []
    return parts.reduce((acc, part) => {
      collect.push(part)
      const clean = part.trim()
      if(!clean || props?.ignore?.includes?.(clean)) return acc
      
      const href = collect.join(`/`)
      const mapped = site?.sitemap?.[href]

      acc.push({
        href,
        disabled: !!!mapped,
        text: props?.map?.[part] || (props.capitalize ? wordCaps(part) : part),
      })

      return acc
    }, [] as TPart[])

  }, [
    site?.sitemap,
    props.map,
    props.split,
    props.parts,
    props.ignore,
    props.capitalize
  ])
}

export const Breadcrumbs = (props:TBreadcrumbs) => {

  const parts = useParts(props)
  const { isDark } = useTheme()

  return (
    <div className={cls(`mg-breadcrumbs breadcrumbs text-sm`)}>
      <ul>
        {parts?.length && parts.map((part:TPart) => {
          return (
            <li key={part.href} >
              <Link
                href={part.href}
                disabled={part.disabled}
                className={cls(
                  isDark ? `text-gray-500` : `text-gray-400`,
                  part.disabled ? `no-underline` : `hover:link-info link-hover`
                )}
              >
                {part.text}
              </Link>
            </li>
          )
        }) || null}
      </ul>
    </div>
  )
  
}