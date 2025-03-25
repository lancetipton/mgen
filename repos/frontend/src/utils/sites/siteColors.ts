import type { TSiteTheme, TSiteThemeColors } from '@MG/types'

import { EThemeType, ESiteCSSVars } from '@MG/types'
import { getThemeName } from '@MG/utils/theme/themeName'
import { convertColors } from '@MG/utils/theme/convertColors'
import { overrideCSSVar, removeCSSVars } from '@MG/utils/dom/overrideCSSVars'

const SiteCSSVars:string[] = Object.values(ESiteCSSVars)

export const siteColors = (theme?:TSiteTheme) => {
  if(!theme) return

  const { dark, light, colors } = convertColors(theme)
  if(!dark && !light && !colors) return

  const themeName = getThemeName()
  const themeColors = themeName === EThemeType.dark ? dark : light

  const values = {...colors, ...themeColors}
  const cached = []

  Object.entries(values)
    .forEach(([key, val]) => {
      const varName = ESiteCSSVars[key]
        ? ESiteCSSVars[key]
        : SiteCSSVars.includes(key) ? key : undefined

      if(!varName) return

      cached.push(varName)
      overrideCSSVar(varName, val)
    })

  return () => removeCSSVars(cached)

}