import { exists } from "@keg-hub/jsutils/exists"
import { softFalsy } from "@keg-hub/jsutils/softFalsy"

const ensureEnv = (env:string, name:string):string => {
  if(!env?.trim?.())
    throw new Error(`The env "${name}" value "${env}" is invalid. Ensure it is set to a valid value`)

  return env
}

const boolCheck = (val:string) => {
  if(!exists(val)) return false
  val = val.toLowerCase()
  return !val || val === `0` || val === `f` || val === `false` ? false : true
}


export const MG_API_PORT = process.env.MG_API_PORT
export const MG_STATIC_BUILD = boolCheck(process.env.MG_STATIC_BUILD)
export const MG_API_URL = ensureEnv(process.env.MG_API_URL, `MG_API_URL`)
export const MG_APP_VERSION = ensureEnv(process.env.MG_APP_VERSION, `MG_APP_VERSION`)

const envPath = process.env.MG_BASE_PATH
export const MG_BASE_PATH = envPath.startsWith(`/`) ? envPath : `/`
