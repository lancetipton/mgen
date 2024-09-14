import type { PluggableList } from '@MG/types'
import type { AllowElement } from 'react-markdown'

import { useEffect, useMemo, useState } from 'react'
import { useLoadDynamic } from '@MG/hooks/components/useLoadDynamic'

export type THMarkdown = {
  latex?: boolean
  allowHtml?: boolean
}

export const useMarkdown = (props:THMarkdown) => {

  const {
    latex=true,
    allowHtml=true,
  } = props


  const rehypeRaw = useLoadDynamic({
    name: `rehypeRaw`,
    loader: async () => import('rehype-raw')
  })
  const remarkGfm = useLoadDynamic({
    name: `remarkGfm`,
    loader: async () => import('remark-gfm')
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
  }, [allowHtml, latex, rehypeRaw, rehypeKatex])

  const remarkPlugins = useMemo(() => {
    const remarkPlugins:PluggableList = []
    remarkGfm && remarkPlugins.push(remarkGfm)
    latex && remarkMath && remarkPlugins.push(remarkMath)

    return remarkPlugins
  }, [latex, remarkMath, remarkGfm])

  return {
    rehypePlugins,
    remarkPlugins
  }

}