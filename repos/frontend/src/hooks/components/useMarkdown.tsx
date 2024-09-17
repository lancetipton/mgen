import type { TTOC, PluggableList } from '@MG/types'

import { useMemo, useRef, useEffect } from 'react'
import { useMGen } from '@MG/contexts/MGenContext'
import { useLoadDynamic } from '@MG/hooks/components/useLoadDynamic'


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
    if(!tocRef.current) return
    mg.dispatch(mg.events.onToc, tocRef.current)
    tocRef.current = undefined
  }, [content])

  const rehypeRaw = useLoadDynamic({
    name: `rehypeRaw`,
    loader: async () => import('rehype-raw')
  })
  const remarkGfm = useLoadDynamic({
    name: `remarkGfm`,
    loader: async () => import('remark-gfm')
  })

  const remarkHeaderId = useLoadDynamic({
    name: `remarkHeaderId`,
    loader: async () => import('remark-heading-id')
  })


  const markdownTOC = useLoadDynamic({
    name: `MarkdownTOC`,
    loader: async () => import('@MG/services/MarkdownTOC')
  })


  const rehypeKatex = useLoadDynamic({
    name: `rehypeKatex`,
    loader: async () => import('rehype-katex')
  })

  const remarkMath = useLoadDynamic({
    name: `remarkMath`,
    loader: async () => import('remark-math')
  })

  const rehypePlugins = useMemo(() => {
    const rehypePlugins: PluggableList = []
    allowHtml && rehypeRaw && rehypePlugins.push(rehypeRaw)
    latex && rehypeKatex && rehypePlugins.push(rehypeKatex)

    return rehypePlugins
  }, [
    allowHtml,
    latex,
    rehypeRaw,
    rehypeKatex
  ])

  const remarkPlugins = useMemo(() => {
    const remarkPlugins:PluggableList = []
    remarkGfm && remarkPlugins.push(remarkGfm)
    latex && remarkMath && remarkPlugins.push(remarkMath)
    remarkHeaderId && remarkPlugins.push(() => remarkHeaderId({ defaults: true }))
    

    markdownTOC
      && remarkPlugins.push(markdownTOC({onToc: (toc:TTOC[]) => tocRef.current = toc}))

    return remarkPlugins
  }, [
    mg,
    latex,
    remarkGfm,
    remarkMath,
    markdownTOC,
    remarkHeaderId
  ])

  return {
    rehypePlugins,
    remarkPlugins
  }

}