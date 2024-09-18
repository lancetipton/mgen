
export const overrideCSSVar = (name?:string, val?:string) => {
  if(!document?.documentElement || !name || !val) return

  const key = name.startsWith(`--`) ? name : `--${name}`
  
  document?.documentElement.style.setProperty(key, val)
}

export const overrideCSSVars = (vars:Record<string, string>) => {
  Object.entries(vars).forEach(([name, val]) => overrideCSSVar(name, val))
}


export const removeCSSVar = (name:string) => {
  name && document?.documentElement?.style?.removeProperty(name)
}

export const removeCSSVars = (vars:string[]) => {
  vars?.length
    && document?.documentElement
    && vars.forEach(removeCSSVar)
}