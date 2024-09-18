import type { TTOC, PluggableList } from '@MG/types'

import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkHeaderId from 'remark-heading-id'
import markdownTOC from '@MG/services/MarkdownTOC'
import { useMemo, useRef, useEffect } from 'react'
import { useMGen } from '@MG/contexts/MGenContext'


export type THMarkdown = {
  content?:string
  latex?: boolean
  allowHtml?: boolean
}


export const useMarkdown = (props:THMarkdown) => {

  const {
    content,
    latex=true,
    allowHtml=true,
  } = props

  const {mg} = useMGen()

  const tocRef = useRef<TTOC[]>()
  useEffect(() => {
    tocRef.current && mg.dispatch(mg.events.onToc, tocRef.current)
  }, [content])

  const rehypePlugins = useMemo(() => {
    const rehypePlugins: PluggableList = []
    allowHtml && rehypePlugins.push(rehypeRaw)
    latex && rehypePlugins.push(rehypeKatex)

    return rehypePlugins
  }, [
    latex,
    allowHtml,
  ])

  const remarkPlugins = useMemo(() => {
    const remarkPlugins:PluggableList = []
    remarkPlugins.push(remarkGfm)
    latex && remarkPlugins.push(remarkMath)
    remarkPlugins.push(() => remarkHeaderId({ defaults: true }))

    markdownTOC
      && remarkPlugins.push(markdownTOC({onToc: (toc:TTOC[]) => tocRef.current = toc}))

    return remarkPlugins
  }, [latex])

  return {
    rehypePlugins,
    remarkPlugins
  }

}