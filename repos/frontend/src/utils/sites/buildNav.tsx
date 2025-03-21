import type { TMGenCfg, TSitesConfig, TSiteNav, TSiteNavItems  } from '@MG/types'


export const buildNav = (config:TMGenCfg) => {
  if(!config?.sitemap) return {}

  console.log(`------- config -------`)
  console.log(config)


  Object.entries(config?.sitemap).reduce((acc, [key, val]) => {
    if(key === `/`) return acc

    const item = {
      text: key,
      url: val,
      children: []
    }
    
    
    return acc
  }, [])



}