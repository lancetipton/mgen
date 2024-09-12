
export type THeaderMobile = {
  open?:boolean
  setOpen?:(status:boolean) => void
}

export const HeaderMobile = (props:THeaderMobile) => {

  const { open, setOpen } = props

  return (
    <div className="mg-header-mobile flex md:hidden">

      <button 
        type="button"
        onClick={() => setOpen(!open)}
        className="mg-header-mobile-btn text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu"
      >
        <svg x-show="!isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
        </svg>

        <svg x-show="isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
  
}