import convert from 'color-convert'
import type { TSiteTheme, TSiteThemeColors } from '@MG/types'


const hexToLch = (hex:string) => rgbToLch(convert.hex.rgb(hex))
const rgbToLch = (rgb:string) => convert.lab.lch(convert.xyz.lab(convert.rgb.xyz(rgb)))

const colorsToLch = (colors:TSiteThemeColors) => {
  return Object.entries(colors).reduce((acc, [key, value]) => {
    if(value.startsWith(`#`)){
      const [l,c,h] = hexToLch(value)
      acc[key] = `${l}% ${c}% ${h}`
    }
    else if(value.startsWith(`rgb`)){
      const [l,c,h] = rgbToLch(value)
      acc[key] = `${l}% ${c}% ${h}`
    }
    else acc[key] = value

    return acc
  }, {} as TSiteThemeColors)
}

export const convertColors = (theme?:TSiteTheme) => {
  if(!theme || (!theme.dark && !theme.light && !theme.colors)) return {}

  return {
    dark: theme.dark && colorsToLch(theme.dark),
    light: theme.light && colorsToLch(theme.light),
    colors: theme.colors && colorsToLch(theme.colors),
  }
}

