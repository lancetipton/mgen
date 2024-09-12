import { cls } from '@keg-hub/jsutils/cls'
import { Loading } from '@MG/components/Loading'
import { MGenId } from '@MG/constants/constants'
import { useMGen } from '@MG/contexts/MGenContext'

export type TContent = {
  
}

export const MGContent = (props:TContent) => {

  const { mm } = useMGen()

  return (
    <div className={cls(
      `mg-content`,
      `side-bar-offset`,
      `max-content-height`,
      `nav-height-offset`,
      `py-10`,
      `px-10`,
      `w-full`,
    )} >
      <article
        id={MGenId}
        className={cls(
          `mg-content-article`,
          `prose`,
          `pb-24`,
          `w-full`,
          `h-full`,
          `min-w-full`,
          `prose-a:text-blue-600`,
          `hover:prose-a:text-blue-500`,
        )}
      >
        {!mm && (<Loading className='mg-content-loading' text={`Loading`} />) || null}
      </article>
    </div>
  )
}