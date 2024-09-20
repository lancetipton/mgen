import { trainCase } from '@keg-hub/jsutils/trainCase'

export const getHash = (hash?:string) => trainCase((hash || ``).replace(`#`, ``))