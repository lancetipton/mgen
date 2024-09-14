import type { ReactNode } from 'react'

import { cls } from '@keg-hub/jsutils/cls'
import { useTheme } from '@MG/contexts/ThemeContext'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrowNight, tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

export type TCode = {
  className?:string
  children?:ReactNode
}

export const Code = (props:TCode) => {

  const { isDark } = useTheme()

  const { className, ...rest } = props
  const hasLang = /language-(\w+)/.exec(className || '')

  return hasLang ? (
    <SyntaxHighlighter
      PreTag='div'
      wrapLongLines={true}
      language={hasLang[1]}
      customStyle={{ margin: `0px` }}
      style={isDark ? tomorrowNight : tomorrow}
      className={cls(
        !isDark && `!bg-[#005dc706]`,
        `!pt-0 !pb-0`,
        `scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded`
      )}
      showLineNumbers={true}
      useInlineStyles={true}
    >
      {String(rest.children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (<code className={className} {...props} />)

}
