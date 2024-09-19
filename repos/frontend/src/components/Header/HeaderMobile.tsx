
export type THeaderMobile = {
  open?:boolean
  setOpen?:(status:boolean) => void
}

export const HeaderMobile = (props:THeaderMobile) => {

  const { open, setOpen } = props

  return (
    <div className="mg-header-mobile flex lg:hidden">
      <button 
        type="button"
        aria-label="toggle menu"
        onClick={() => setOpen(!open)}
        className="mg-header-mobile-btn focus:outline-none"
      >
        {open ? (
          <svg
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            fill="none"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor" strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
    </div>
  )
  
}