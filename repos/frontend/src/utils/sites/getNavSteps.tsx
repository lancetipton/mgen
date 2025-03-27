import { TSiteConfig } from '@MG/types'

export const getNavSteps = (site:TSiteConfig) => {

  const pathname = window.location.pathname

  const idx = site?.steps.findIndex(step => (
    step?.path === pathname
      || step.dir === pathname
      || step.url === pathname
  ))

  if(!site?.steps || idx < 0) return { prev: { disabled: true }, next: { disabled: true } }

  const prev = site?.steps[idx - 1]
  const next = site?.steps[idx + 1]

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