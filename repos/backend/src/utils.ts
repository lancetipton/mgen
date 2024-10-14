import { wordCaps } from "@keg-hub/jsutils/wordCaps"


export const locToTitle = (loc:string) => {
  const split = loc.split(`/`).reverse()
  for (let part in split){
    const trimmed = split[part].trim()
    if(!trimmed) continue
    return wordCaps(trimmed)
  }
}