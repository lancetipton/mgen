import { ThemeSwitch } from '@MG/components/Header/ThemeSwitch'


export type THeaderSearch = {
  
}

export const HeaderSearch = (props:THeaderSearch) => {

  return (
    <div className='flex' >
      <ThemeSwitch />
      <div className="mg-header-search relative mt-4 md:mt-0 ml-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </span>

        <input type="text" className="mg-header-search-input w-full py-2 pl-10 pr-4 rounded-lg" placeholder="Search" />
      </div>
    </div>
  )

}