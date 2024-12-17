import { MG_STATIC_BUILD } from '@MG/constants/envs'


export const staticApi = async () => {
  return MG_STATIC_BUILD
    ? await import(`./Api`).then(mod => mod.api.fetch)
    : fetch
}
