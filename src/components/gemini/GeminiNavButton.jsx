import { useLocation } from 'react-router';
import { GEMINI_LOGO } from '../../utils/constants';

function GeminiNavButton({ onClick }) {
    // Current URL path nikal rahe hain
    const location = useLocation();
    
    // Check kar rahe hain ki kya hum '/browse' wale page par hain (chahe '/app/browse' ho)
    const isBrowsePage = location.pathname.includes('/browse');

    return (
        <button 
            onClick={onClick}
            title="Ask AI Mode"
            className="group relative inline-flex items-center justify-center rounded-full"
        >
            {/* Background Glows: Agar browse page hai, toh hamesha dikhega (opacity-100), warna sirf hover pe */}
            <div className={`absolute -inset-[1px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] rounded-full blur-[4px] transition-all duration-300 ${isBrowsePage ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
            
            <div className={`absolute -inset-[1px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] rounded-full transition-all duration-300 ${isBrowsePage ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

            {/* Actual Button 
                - Mobile par hamesha 'p-2' (gol). 
                - Desktop (md) par: Agar browse page hai, toh fix px-4 py-2 (open pill), warna hover pe open hoga. 
            */}
            <div className={`relative flex items-center bg-zinc-800 text-white rounded-full font-medium text-sm md:text-base z-10 transition-all duration-500 ease-out active:scale-95 ${
                isBrowsePage 
                ? 'p-2 md:px-4 md:py-2' 
                : 'p-2 md:group-hover:px-4 md:group-hover:py-2'
            }`}>
                
                <img src={GEMINI_LOGO} alt="Gemini AI" className='w-5 h-5 md:w-6 md:h-6 shrink-0' />
                
                {/* Text Animation 
                    - Mobile par hamesha hidden (max-w-0 opacity-0).
                    - Desktop (md) par: Agar browse page hai, toh fix open rahega, warna hover pe.
                */}
                <span className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-out ${
                    isBrowsePage 
                    ? 'max-w-0 opacity-0 md:max-w-[120px] md:opacity-100 md:ml-2' 
                    : 'max-w-0 opacity-0 md:group-hover:max-w-[120px] md:group-hover:opacity-100 md:group-hover:ml-2'
                }`}>
                    Gemini
                </span>
                
            </div>
        </button>
    );
}

export default GeminiNavButton;