import type { ReactNode } from 'react'

import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'


export type TCode = {
  className?:string
  children?:ReactNode
}

export const Code = (props:TCode) => {

  const { className, ...rest } = props
  const hasLang = /language-(\w+)/.exec(className || '')

  return hasLang ? (
    <SyntaxHighlighter
      PreTag="div"
      style={oneDark}
      wrapLongLines={true}
      language={hasLang[1]}
      customStyle={{ margin: `0px` }}
      className='mockup-code scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded'
      showLineNumbers={true}
      useInlineStyles={true}
    >
      {String(rest.children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (<code className={className} {...props} />)

}