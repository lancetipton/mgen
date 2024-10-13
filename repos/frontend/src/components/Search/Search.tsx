import { useMGen } from '@MG/contexts/MGenContext'
import { ThemeSwitch } from '@MG/components/Header/ThemeSwitch'

export type TSearch = {}

export const Search = (props:TSearch) => {
  const { site } = useMGen()
  if(!site?.dir) return null

  return (
    <div className="mg-search relative mt-0 ml-4">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
          />
        </svg>
      </span>

      <input
        type="text"
        placeholder="Search"
        className="mg-header-search-input w-full py-1 pl-10 pr-4 rounded-lg input input-bordered h-[2.5rem]"
      />
    </div>
  )

}