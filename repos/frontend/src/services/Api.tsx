import { isStr } from '@keg-hub/jsutils/isStr'




class Api {

  local:boolean

  constructor(local?:boolean){
    if(local) this.local = local
  }

  #lookup = async (input:string, init?:RequestInit):Promise<Response> => {
    let loc = input
    if(!isStr(loc)){
      
      
    }

    return new Response()
  }


  fetch = async (input:string, init?:RequestInit):Promise<Response> => {
    return !this.local ? await fetch(input, init) : await this.#lookup(input, init)
  }

}


export const api = new Api()