import type { ToastT } from 'sonner'

import { toast } from 'sonner'
import { EAlertType, EAlertPos } from '@MG/types'
import { isFunc } from '@keg-hub/jsutils'


type TAlertAction = ToastT[`action`]

export type TAlertOptions = {
  icon?:any
  id?:string
  text?:string
  duration?:number
  type?:EAlertType
  position?: EAlertPos
  action?:TAlertAction
  cancel?:TAlertAction
  success?:TAlertAction
}


export class Alert {
  
  constructor(opts?:any){
    
  }

  alert = (opts:TAlertOptions) => {
    const {type=EAlertType.info, text=``,  ...rest} = opts
    const func = isFunc(toast[type]) ? toast[type] : toast.info
    func(text, rest)
  }

  success = (opts:TAlertOptions) => {
    this.alert({
      type: EAlertType.success,
      ...opts
    })
  }

  warn = (opts:TAlertOptions) => {
    this.alert({
      type: EAlertType.warning,
      ...opts
    })
  }

  error = (opts:TAlertOptions) => {
    this.alert({
      type: EAlertType.error,
      ...opts
    })
  }

  info = (opts:TAlertOptions) => {
    this.alert({
      type: EAlertType.info,
      ...opts
    })
  }



}