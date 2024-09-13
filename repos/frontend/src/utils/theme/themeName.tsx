import { EThemeTypes } from '@MG/types'
import { ife } from '@keg-hub/jsutils/ife'
import { storage } from '@MG/services/Storage'
import { DataThemeAttr } from '@MG/constants/constants'

export const getThemeName = () => {
  const theme = storage.getTheme()
  if(theme) return theme

  return window?.matchMedia?.(`(prefers-color-scheme: dark)`).matches ? EThemeTypes.dark : EThemeTypes.light
}

export const setThemeName = (themeName?:EThemeTypes) => {
  themeName = themeName || getThemeName()
  document.documentElement.setAttribute(DataThemeAttr, themeName)
  storage.setTheme(themeName)
}

ife(setThemeName)
