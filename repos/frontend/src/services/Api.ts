import { MG_STATIC_BUILD } from '@MG/constants/envs'

export class Api {

  fetch = async (input:string, init?:RequestInit, local?:boolean):Promise<Response> => {
    return !local || !MG_STATIC_BUILD
      ? await fetch(input, init)
      : await fetch(`/sites${new URL(input).pathname}`, init)
  }

}

export const api = new Api()