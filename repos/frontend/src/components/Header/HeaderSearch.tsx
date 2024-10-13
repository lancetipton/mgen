import { useMGen } from '@MG/contexts/MGenContext'
import { Search } from '@MG/components/Search/Search'
import { ThemeSwitch } from '@MG/components/Header/ThemeSwitch'

export type THeaderSearch = {}

export const HeaderSearch = (props:THeaderSearch) => {
  const { site } = useMGen()
  if(!site?.dir) return null

  return (
    <div className='flex' >
      <ThemeSwitch />
      <Search />
    </div>
  )

}