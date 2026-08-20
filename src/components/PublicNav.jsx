import { Link, useLocation } from "react-router"
import { NETFLIX_LOGO } from "../utils/constants"


function PublicNav() {
    const location = useLocation()
    const AUTH_ACTION_BUTTON_TEXT = location.pathname === '/signin' ? "Sign Up" : "Sign In";
    const AUTH_ACTION_BUTTON_PATH = location.pathname === '/signin' ? '/signup' : '/signin';
    return (
        // Fixed: changed bg-linear-to-b to bg-gradient-to-b, and removed bg-transparent
        <div className="absolute w-full bg-linear-to-b from-black to-transparent z-20">
            <div className="w-full flex justify-between items-center py-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
                <Link className="logo-con w-24 md:w-34" to='/'>
                    <img src={NETFLIX_LOGO} alt="netflix logo" />
                </Link>

                <div className="flex gap-2 items-center text-white">
                    <Link
                        className="bg-red-600 rounded px-4 py-2 text-sm font-medium"
                        to={AUTH_ACTION_BUTTON_PATH}
                    >{AUTH_ACTION_BUTTON_TEXT}</Link>
                </div>
            </div>
        </div>
    )

}

export default PublicNav
