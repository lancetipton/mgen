import type { ReactNode } from 'react'
import { useRef, useEffect, useState } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { CloseIcon } from '@MG/components/Icons/CloseIcon'

export type TLightbox = {
  manual?:boolean
  backdrop?:boolean
  className?:string
  children?:ReactNode
  containerClass?:string
}

export const Lightbox = (props:TLightbox) => {
  const {
    children,
    className,
    manual=false,
    backdrop=true,
    containerClass,
  } = props
  
  const [opened, setOpened] = useState(false)

  const onClick = (evt:any) => {
    evt.stopPropagation()
    evt.preventDefault()

    if(opened){
      setOpened(false)
      return
    }
    setOpened(true)
  }

  useEffect(() => {

    const handleKeyDown = (evt:any) => {
      evt.key === `Escape`
        && opened
        && onClick(evt)
    }

    document.addEventListener(`keydown`, handleKeyDown);

    return () => {
      document.removeEventListener(`keydown`, handleKeyDown);
    }
  }, [opened])


  return (
    <>
      <span onClick={onClick} >
        {children}
      </span>
      {opened && (
        <div
          onClick={backdrop ? onClick : undefined}
          className={cls(
            className,
            `mgen-lightbox-container`,
            `p-10`,
            `fixed`,
            `z-[100]`,
            `inset-0`,
            `bg-base-100`,
            `target:block`,
            `overflow-auto`,
            !manual && `cursor-pointer`,
          )}
        >
          <div
            className={cls(
              `mgen-lightbox-content`,
              containerClass,
            )}
          >
            {children}
            {manual && (
              <div
                onClick={onClick}
                className={cls(
                  `mgen-lightbox-manual`,
                  `fixed`,
                  `size-10`,
                  `text-error`,
                  `top-[10px]`,
                  `right-[10px]`,
                  `cursor-pointer`,
                  `hover:text-red-500`,
                )}
              >
                <CloseIcon
                  fill={`currentColor`}
                  stroke={`currentColor`}
                  className={`size-10 hover:text-red-300`}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
  
}
