import type { TNode, TMDTocOpts } from '@MG/types'

import { trainCase } from '@keg-hub/jsutils/trainCase'


const buildUrl = (
  base:string,
  text?:string,
  existing?:string,
  id?:string
) => {
  return existing
    ? {url: existing}
    : text || id
      ? {url: `${base}#${id || trainCase(text)}`}
      : {}
}


const getText = (
  base:string,
  children:TNode[],
  id:string
) => {

  let text:string = ``
  const built = children.reduce((acc, child) => {
    if(child.type === `text`) text = `${text} ${child.value}`.trim()

    else {

      const {
        id,
        text,
        children:childs
      } = getText(
        base,
        child.children,
        child?.data?.id || child?.data?.hProperties.id
      )

      acc.push({
        id,
        value: text,
        type: child.type,
        children: childs,
        ...buildUrl(base, text, child.url, id),
      })
    }

    return acc
  }, [])

  return {
    text,
    children: built,
    id: id || trainCase(text),
  }

}

const isAllowed = (child:TNode, opts:TMDTocOpts) => {
  const { toc } = opts
  if(!toc || (!toc.exclude?.length && !toc.include?.length)) return true
  
  const current = `${child?.type}${child?.depth}`
  
  const isExcluded = toc?.exclude
    ? Boolean(toc.exclude.find(item => item === current))
    : false
  
  const isIncluded = toc?.include
    ? Boolean(toc.include.find(item => item === current))
    : true
  
  return isExcluded ? false : isIncluded ? true : false
}


const loopChildren = (base:string, children:TNode[], opts:TMDTocOpts) => {
  const { toc } = opts
  if(toc?.disabled) return []


  return children.reduce((acc, child) => {
    if(child?.type !== `heading`) return acc

    if(!isAllowed(child, opts)) return acc 

    const {
      id,
      text,
      children:childs
    } = getText(base, child.children, child?.data?.id || child?.data?.hProperties.id)
    acc.push({
      id,
      value: text,
      children: childs,
      ...buildUrl(base, text, undefined, id),
      type: `h${child.depth}`,
    })

    return acc
  }, [])
}


const MarkdownTOC = (opts:TMDTocOpts={}) => {
  const { onToc } = opts

  return function () {
    return function (tree:TNode) {
      if(!onToc) return undefined

      const base = opts.base || window.location.pathname

      const toc = tree?.children?.length
        && loopChildren(base, tree?.children, opts)

      toc && onToc(toc)
    }
  }

}

export default MarkdownTOC
