
export type TAlertOptions = {
  icon:string
  titleText:string
}


export class Alert {
  
  constructor(opts?:any){
    
  }

  alert = (opts:TAlertOptions) => {
    
  }

  success = (opts:TAlertOptions) => {
    this.alert({
      icon: `success`,
      titleText: `Success`,
      ...opts
    })
  }

  warn = (opts:TAlertOptions) => {
    this.alert({
      icon: `warning`,
      titleText: `Warning`,
      ...opts
    })
  }

  error = (opts:TAlertOptions) => {
    this.alert({
      icon: `error`,
      titleText: `Error`,
      ...opts
    })
  }

  info = (opts:TAlertOptions) => {
    this.alert({
      icon: `info`,
      titleText: `Info`,
      ...opts
    })
  }



}