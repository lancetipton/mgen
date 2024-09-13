import { EThemeTypes } from '@MG/types'
import { useMemo, useCallback, useRef } from 'react'
import { getThemeName, setThemeName } from "@MG/utils/theme/themeName"

const defTheme = getThemeName()
const opTheme = defTheme === EThemeTypes.dark ? EThemeTypes.light : EThemeTypes.dark

export const useThemeSwitch = () => {

  const inputRef = useRef<any>()
  const onThemeSwitch = useCallback(() => {
    const theme = !inputRef.current.checked ? defTheme  : opTheme
    setThemeName(theme)
  }, [])

  const [lightCls, darkCls] = useMemo(() => defTheme === `dark` ? [`swap-off`, `swap-on`] : [`swap-on`, `swap-off`], [])

  return {
    lightCls,
    darkCls,
    defTheme,
    inputRef,
    onThemeSwitch
  }

}