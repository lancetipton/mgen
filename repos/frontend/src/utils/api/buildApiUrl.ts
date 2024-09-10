import { MG_API_URL, MG_API_PORT } from '@MG/constants'

let baseUrl: string = ``

/**
 * If `host.docker.internal is set, use `localhost`
 */
const getApiUrl = () => MG_API_URL.replace(`host.docker.internal`, `localhost`)

/**
 * Checks if the `MG_API_PORT` env is set
 * If it is, then updates the base api url to use it instead of the default port
 */
const checkAPIPort = (url:string) => {
  if(!MG_API_PORT) return url
  
  const urlObj = new URL(url)
  urlObj.port = MG_API_PORT

  return urlObj.toString()
}

/**
 * Builds and caches the API base URL
 * Uses the required `MG_API_URL` and `MG_API_PORT` envs
 */
export const buildApiUrl = () => {
  if (baseUrl) return baseUrl

  baseUrl = checkAPIPort(getApiUrl())
  return baseUrl
}
