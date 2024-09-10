import type { SweetAlertOptions } from 'sweetalert2'
import Swal from 'sweetalert2'


import 'sweetalert2/src/sweetalert2.scss'

export class Alert {
  
  constructor(opts?:any){
    
  }

  alert = (opts:SweetAlertOptions) => Swal.fire(opts)

  success = (opts:SweetAlertOptions) => {
    Swal.fire({
      icon: `success`,
      titleText: `Success`,
      ...opts
    })
  }

  warn = (opts:SweetAlertOptions) => {
    Swal.fire({
      icon: `warning`,
      titleText: `Warning`,
      ...opts
    })
  }

  error = (opts:SweetAlertOptions) => {
    Swal.fire({
      icon: `error`,
      titleText: `Error`,
      ...opts
    })
  }

  info = (opts:SweetAlertOptions) => {
    Swal.fire({
      icon: `info`,
      titleText: `Info`,
      ...opts
    })
  }



}