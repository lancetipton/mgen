import type { ReactNode } from 'react'
import type { ExtraProps } from 'react-markdown'

import { Suspense, lazy } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { Mermaid } from '@MG/components/Mermaid'
import { Loading } from '@MG/components/Loading'
import { useTheme } from '@MG/contexts/ThemeContext'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs2015, vs } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const Schema = lazy(() => import('@MG/components/Schema/Schema'))

import { ECodeIgnore } from '@MG/types'

export type TCode = ExtraProps & {
  className?:string
  children?:ReactNode
}

export const Code = (props:TCode) => {

  const { isDark } = useTheme()

  const { className, ...rest } = props
  const hasLang = /language-(\w+)/.exec(className || '')
  const language = hasLang?.[1]

  switch(language){
    case ECodeIgnore.mermaid: {
      return (
        <Mermaid className={className} >
          {rest.children}
        </Mermaid>
      )
    }
    case ECodeIgnore.schema: {
      return (
        <Suspense fallback={<Loading className='w-full flex justify-center items-center min-h-[200px]' />}>
          <Schema {...props} />
        </Suspense>
      )
    }
    // TODO: add Components for these
    case ECodeIgnore.graph:
    case ECodeIgnore.chart:
    // TODO investigate dynamic components via '```react' block
    case ECodeIgnore.react:
    default: {
      return hasLang
        ? (
            <SyntaxHighlighter
              PreTag='div'
              wrapLongLines={true}
              language={hasLang[1]}
              customStyle={{ margin: `0px` }}
              style={isDark ? vs2015 : vs}
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
          )
        : (<code className={className} {...props} />)
    }
  }

}
