import { cls } from '@keg-hub/jsutils/cls'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'
import { Steps } from '@MG/components/Steps'
import { Loading } from '@MG/components/Loading'
import { Code } from '@MG/components/Code/Code'
import { useMGen } from '@MG/contexts/MGenContext'
import { PreCode } from '@MG/components/Code/PreCode'
import { Breadcrumbs } from '@MG/components/Breadcrumbs'
import { useMarkdown } from '@MG/hooks/components/useMarkdown'


export type TMGContent = {
  latex?: boolean
  allowHtml?: boolean
}


export const MGContent = (props:TMGContent) => {


  const [content, setContent] = useState<string>(``)
  const {
    rehypePlugins,
    remarkPlugins
  } = useMarkdown({...props, content})

  const { mg, site, path } = useMGen()

  useEffect(() => {
    if(!mg) return

    const offRender = mg.on(mg.events.onRender, (content:string) => setContent(content))

    return () => {
      offRender()
    } 
  }, [mg])

  return (
    <div className={cls(
      `mg-mg-content`,
      `px-6`,
      `md:px-8`,
      `lg:px-4`,
      `py-3`,
      `flex`,
      `pb-32`,
      `w-full`,
      `justify-center`,
      `flex-col`,
      `max-w-[100vw]`,
    )} >
      <div className={cls(`mg-breadcrumbs-container mb-6`)} >
        <Breadcrumbs
          capitalize
          path={path}
          map={{ [site?.dir]: `Home` }}
        />
      </div>
      <article
        className={cls(
          `mg-content-article`,
          `prose`,
          `pb-12`,
          `w-full`,
          `h-full`,
          `min-w-full`,
          `xl:max-w-[90ch]`,
          `prose-a:text-blue-600`,
          `hover:prose-a:text-blue-500`,
        )}
      >
        {!mg && (<Loading className='mg-content-loading' text={`Loading`} />) || null}
        <ReactMarkdown
          remarkPlugins={remarkPlugins}
          rehypePlugins={rehypePlugins}
          components={{
            code:Code,
            pre:PreCode,
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
      <Steps path={path} />
    </div>
  )
}