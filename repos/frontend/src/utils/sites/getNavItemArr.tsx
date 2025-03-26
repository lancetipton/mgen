import type { TItem } from '@MG/types'

export const getNavItemArr = (
  children:TItem[`children`],
  config:TItem[`config`]
) => {
  return !children
    ? []
    : Object.values(children).reduce((acc, child) => {

        if(!child?.path){
          const key = child.dir.split(`/`).pop()
          !config?.exclude?.includes?.(key)
            && acc.push({...child, key})

          return acc
        }
      
        const key = child.path.split(`/`).pop()
        !config?.exclude?.includes?.(key)
          && acc.push({...child, key})

        return acc
      }, [])
}