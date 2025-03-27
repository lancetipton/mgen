
export type TRouteData = {
  scrollX: number
  scrollY: number
  popstate: boolean
}


export enum EMGenEvts {
  onToc=`onMGToc`,
  onSite=`onMGSite`,
  onError=`onMGError`,
  onRoute=`onMGRoute`,
  onRender=`onMGRender`,
  onSearchError=`onSearchError`,
  onSearchLoaded=`onSearchLoaded`,
}

export enum ECodeIgnore {
  code=`code`,
  react=`react`,
  chart=`chart`,
  graph=`graph`,
  schema=`schema`,
  mermaid=`mermaid`,
}
