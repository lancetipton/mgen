import { TSiteConfig } from '@MG/types'


export const getNavSteps = (site:TSiteConfig) => {

  const current = site?.steps?.[window.location.pathname]

  if(!site?.steps || !current) return { prev: { disabled: true }, next: { disabled: true } }

  const steps = Object.values(site?.steps)
  const idx = steps.findIndex(nav => nav.url === current.url)
  const prev = steps[idx - 1]
  const next = steps[idx + 1]

  return {
    prev: {
      disabled: !prev,
      href: prev?.url,
      children: prev?.text || ``,
    },
    next: {
      disabled: !next,
      href: next?.url,
      children: next?.text || ``,
    }
  }
}