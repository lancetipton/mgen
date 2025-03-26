import { wordCaps } from "@keg-hub/jsutils/wordCaps"

export const titleText = (loc:string) => {
  return wordCaps(
    loc
    .replace(/[\.-_:\/\\]/g, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, '')
  )
}


export const locToTitle = (loc:string) => {
  const split = loc.split(`/`).reverse()
  for (let part in split){
    const trimmed = split[part].trim()
    if(!trimmed) continue

    const clean = trimmed.replace(/[^a-zA-Z0-9\s]/g, '')
    return wordCaps(clean)
  }
}

export const cleanUrl = (loc:string) => {
  return loc.replace(/^[\.|\?]/, ``)
}
