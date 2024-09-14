import { EThemeType } from '@MG/types'
import { ife } from '@keg-hub/jsutils/ife'
import { storage } from '@MG/services/Storage'
import { DataThemeAttr } from '@MG/constants/constants'

export const getThemeName = () => {
  const theme = storage.getTheme()
  if(theme) return theme

  return window?.matchMedia?.(`(prefers-color-scheme: dark)`).matches ? EThemeType.dark : EThemeType.light
}

export const setThemeName = (themeName?:EThemeType) => {
  themeName = themeName || getThemeName()
  document.documentElement.setAttribute(DataThemeAttr, themeName)
  storage.setTheme(themeName)
}

ife(setThemeName)
