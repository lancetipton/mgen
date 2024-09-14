import type { TMemoChildren } from '@MG/components/MemoChildren'


import { EThemeType } from '@MG/types'
import { MemoChildren } from '@MG/components/MemoChildren'
import { getThemeName, setThemeName } from "@MG/utils/theme/themeName"
import { useState, useContext, createContext, useCallback } from "react"

const defTheme = getThemeName()
const altTheme = defTheme === EThemeType.dark ? EThemeType.light : EThemeType.dark


export type TThemeProvider = TMemoChildren & {
  selector?:string
}

export type TThemeCtx = {
  isDark:Boolean
  theme:EThemeType
  defTheme:EThemeType
  altTheme:EThemeType
  setTheme: (name:EThemeType) => void
}

const MMContext = createContext<TThemeCtx | null>(null)
export const useTheme = () => useContext(MMContext)


export const ThemeProvider = (props:TThemeProvider) => {
  const { children } = props

  const [ctx, setCtx] = useState<TThemeCtx>({
    altTheme,
    defTheme,
    theme: defTheme,
    isDark: defTheme === EThemeType.dark,
    setTheme: (name:EThemeType) => {
      setThemeName(name)
      setCtx({
        ...ctx,
        theme: name,
        isDark: name === EThemeType.dark,
      })
    }
  })


  return (
    <MMContext.Provider value={ctx}>
      <MemoChildren children={children} />
    </MMContext.Provider>
  )
}
