
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
}