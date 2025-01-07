import { cls } from '@keg-hub/jsutils/cls'

export type TNotFound = {
  
}

export const NotFound = (props:TNotFound) => {
  return (
    <div className={cls(
      `px-6`,
      `py-0`,
      `flex`,
      `w-full`,
      `flex-col`,
      `justify-center`,
    )} >
      <div className="container">
      <div className="error-wrap">
        <h2 className={cls(
          `text-base`,
          `mb-0`,
          `py-0`
        )}>
          404 - Not Found
        </h2>
        <div className='not-found-error-text-container'>
          <span className='text-sm'>
            This page does not exist
          </span>
        </div>
      </div>
      </div>
    </div>
  )
  
}
