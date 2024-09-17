export type TTOC = {
  url?:string
  type?:string
  value?:string
  children?:TTOC[]
}

export type TNodePos = {
  end: any
  start: any
}


export type TNode = {
  children?:TNode[]
  depth?:number
  type?:string
  position:TNodePos
  value?:string|number
  meta?:any
  url?:string
  lang?:string
  title?:string
}
