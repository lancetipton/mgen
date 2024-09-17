import type { TTOC, TNode } from '@MG/types'
import { trainCase } from '@keg-hub/jsutils/trainCase'

export type TMarkdownTOC = {
  base?:string
  onToc?:(toc:TTOC[]) => any
}

const buildUrl = (base:string, text?:string, existing?:string) => {
  return existing ? {url: existing} : text ? {url: `${base}#${trainCase(text)}`} : {}
}

const getText = (base:string, children:TNode[]) => {

  let text:string = ``
  const built = children.reduce((acc, child) => {
    if(child.type === `text`)
      text = `${text} ${child.value}`.trim()

    else {
      const { text, children:childs } = getText(base, child.children)
      acc.push({
        value: text,
        ...buildUrl(base, text, child.url),
        type: child.type,
        children: childs
      })
    }

    return acc
  }, [])

  return {
    text,
    children: built
  }

}

const loopChildren = (base:string, children:TNode[]) => {
  return children.reduce((acc, child) => {
    if(child?.type !== `heading`) return acc

    const { text, children:childs } = getText(base, child.children)
    acc.push({
      value: text,
      ...buildUrl(base, text),
      children: childs,
      type: `h${child.depth}`,
    })

    return acc
  }, [])
}


const MarkdownTOC = (opts:TMarkdownTOC={}) => {
  const { onToc } = opts

  return function () {
    return function (tree:TNode) {
      if(!onToc) return undefined

      const base = opts.base || window.location.pathname

      const toc = tree?.children?.length
        && loopChildren(base, tree?.children)

      toc && onToc(toc)
    }
  }

}

export default MarkdownTOC
