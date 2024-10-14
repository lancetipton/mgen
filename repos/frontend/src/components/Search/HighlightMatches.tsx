import type { ReactNode } from 'react'

import { memo } from 'react'
import { escapeRegexp } from '@MG/utils/sites/escapeRegexp'

export type HighlightMatches = {
  value?: string
  match: string
}

export const HighlightMatches = memo<HighlightMatches>((props:HighlightMatches) => {

  const {
    value,
    match
  } = props

  if (!value) return null

  const splitText = value.split(``)
  const escapedSearch = escapeRegexp(match.trim())
  const regexp = new RegExp(escapedSearch.replaceAll(/\s+/g, `|`), `ig`)
  let result
  let index = 0
  const content: (string | ReactNode)[] = []

  while ((result = regexp.exec(value))) {
    if (result.index === regexp.lastIndex) regexp.lastIndex++
    else {
      const before = splitText.splice(0, result.index - index).join('')
      const after = splitText
        .splice(0, regexp.lastIndex - result.index)
        .join('')

      content.push(
        before,
        <span key={result.index} className="text-primary">
          {after}
        </span>
      )
      index = regexp.lastIndex
    }
  }

  return (
    <>
      {content}
      {splitText.join(``)}
    </>
  )
})
