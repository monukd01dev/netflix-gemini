import { NETFLIX_HEADER_BG_IMG } from "../utils/constants"


function AuthBackground({children}) {
  return (
    <header className={`relative min-h-175 h-screen 
      bg-[url('${NETFLIX_HEADER_BG_IMG}')] 
      bg-cover 
      bg-center
    `}>

            <div className="absolute inset-0 bg-black/40 bg-linear-to-b from-black/80 via-transparent to-black/80"></div>


            <div className="relative z-10 w-full flex flex-col items-center justify-center h-full px-4 text-center">
              {children}
            </div>

    </header>
  )
}

export default AuthBackground
