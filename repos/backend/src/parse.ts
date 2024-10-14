import type { MarkedOptions } from 'marked'

import { marked } from 'marked'
import { trainCase } from '@keg-hub/jsutils/trainCase'

type HeadTag = `h1`|`h2`|`h3`|`h4`|`h5`|`h6`

type TRender = Partial<MarkedOptions[`renderer`]>

type THSection = {
  tag:HeadTag
  text:string
  hash?:string
  title?:string
}


export const parseMD = (content:string, url) => {
  const sections:THSection[] = []
  let active: THSection = undefined

  const renderer:TRender = {
    heading: ({ tokens, depth, text, raw, type }) => {
      const section = {
        text: ``,
        title: text,
        tag: `h${depth}` as HeadTag,
        hash: `${url}#${trainCase(text)}`,
      }
      active = section
      sections.push(section)
      return ``
    },
    paragraph: ({ type, text, raw, tokens }) => {
      if(active) active.text = `${active.text}\n${text}`
      return ``
    },
    text: ({ text }) => {
      if(active) active.text = `${active.text}\n${text}`

      return ``
    },
    code: ({ text, raw, ...rest }) => {
      if(active) active.text = `${active.text}\n${raw}`
      return ``
    }

    //space(token: Tokens.Space): string;
    //code({ text, lang, escaped }: Tokens.Code): string;
    //blockquote({ tokens }: Tokens.Blockquote): string;
    //html({ text }: Tokens.HTML | Tokens.Tag): string;
    //hr(token: Tokens.Hr): string;
    //list(token: Tokens.List): string;
    //listitem(item: Tokens.ListItem): string;
    //checkbox({ checked }: Tokens.Checkbox): string;
    //table(token: Tokens.Table): string;
    //tablerow({ text }: Tokens.TableRow): string;
    //tablecell(token: Tokens.TableCell): string;
    //strong({ tokens }: Tokens.Strong): string;
    //em({ tokens }: Tokens.Em): string;
    //codespan({ text }: Tokens.Codespan): string;
    //br(token: Tokens.Br): string;
    //del({ tokens }: Tokens.Del): string;
    //link({ href, title, tokens }: Tokens.Link): string;
    //image({ href, title, text }: Tokens.Image): string;
  }

  marked.use({ renderer })
  marked.parse(content)

  return sections
}