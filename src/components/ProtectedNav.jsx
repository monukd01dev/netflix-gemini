import { Link, useNavigate } from "react-router";
import { User, LogOut, Home } from "lucide-react"; // Home icon add kiya
import { NETFLIX_LOGO } from "../utils/constants";
import { logout } from "../services/auth.service";
import useProtectedNav from "../hooks/useProtectedNav";
import GeminiNavButton from "../components/gemini/GeminiNavButton"; // Tera Gemini Button import kar lena

function ProtectedNav({ ratio }) {
    const navigate = useNavigate(); // Navigate hook for Gemini Button
    const {
        isDropdownOpen,
        setIsDropdownOpen,
        userInitial,
        glassOpacity,
        blurAmount,
        gradientOpacity
    } = useProtectedNav(ratio)

    return (
        <div
            className="fixed top-0 w-full z-50"
            style={{
                backgroundColor: `rgba(0, 0, 0, ${glassOpacity})`,
                backdropFilter: `blur(${blurAmount}px)`,
                WebkitBackdropFilter: `blur(${blurAmount}px)`,
            }}
        >
            {/* The Original Gradient Background */}
            <div
                className="absolute inset-0 bg-linear-to-b from-black/90 via-black/30 to-transparent pointer-events-none -z-10"
                style={{ opacity: gradientOpacity }}
            ></div>

            {/* THE INVISIBLE OVERLAY (Click outside to close) */}
            {/* ISE PARENT LEVEL PAR RAKHA HAI TAAKI CLICK MISS NA HO */}
            {isDropdownOpen && (
                <div
                    onClick={() => setIsDropdownOpen(false)}
                    className="fixed top-0 left-0 w-screen h-screen z-40 cursor-default"
                ></div>
            )}

            {/* Navbar Content */}
            <div className="w-full flex justify-between items-center py-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-50">

                {/* LEFT SIDE: Logo ONLY */}
                <div className="flex items-center ">
                    <Link className="w-24 md:w-34" to="/app">
                        <img src={NETFLIX_LOGO} alt="Netflix logo" />
                    </Link>
                </div>

                {/* RIGHT SIDE: Gemini Button & Avatar */}
                <div className="relative flex items-center gap-4 sm:gap-6">

                    {/* 1. Gemini AI Button (Replaces Browse) */}
                    <GeminiNavButton onClick={() => navigate('/app/browse')} />

                    {/* 2. The Avatar Button */}
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="relative z-50 cursor-pointer group"
                    >
                        <div className="w-9 h-9 bg-linear-to-tr from-red-700 to-red-500 rounded-md flex items-center justify-center text-white font-medium text-sm shadow-md ring-1 ring-white/20 group-hover:ring-white/60 transition-all duration-200">
                            {userInitial}
                        </div>
                    </button>

                    {/* 3. The Dropdown Menu (Now includes Home & Account) */}
                    <div
                        className={`absolute right-0 top-14 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-2xl py-2 flex flex-col z-50 transform origin-top-right transition-all duration-200 ease-out ${
                            isDropdownOpen
                            ? "scale-100 opacity-100 pointer-events-auto"
                            : "scale-95 opacity-0 pointer-events-none"
                        }`}
                    >
                        {/* HOME LINK ADDED HERE */}
                        <Link
                            to="/app"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                            <Home className="w-4 h-4" />
                            Home
                        </Link>

                        <Link
                            to="/app/account"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                            <User className="w-4 h-4" />
                            Account
                        </Link>

                        <button
                            onClick={logout}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors border-t border-zinc-800 mt-2 pt-2 w-full text-left cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign out
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProtectedNav;