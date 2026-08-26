import { Trash2 } from 'lucide-react'; // Ya XCircle use kar lena
import useAIMovieStore from '../../store/aiMovieStore';

function ClearSearchButton({ onClearSuccess }) {
    // 1. Store se values aur action nikal
    // Note: Apne variable names check kar lena, maine reference ke liye ye rakhe hain
    const { isAILoading, aiRecomendedMoviesData, clearAIMovieStore } = useAIMovieStore();

    // 2. Condition check: Loading nahi honi chahiye aur data hona chahiye
    const shouldShow = !isAILoading && aiRecomendedMoviesData && aiRecomendedMoviesData.length > 0;

    // Agar condition meet nahi hoti, toh button DOM mein render hi nahi hoga
    if (!shouldShow) return null;

    const handleClearClick = () => {
        // 1. Data clear karo
        clearAIMovieStore();
        // 2. Parent ko batao taaki wo focus kar sake
        if (onClearSuccess) onClearSuccess();
    };
    
    return (
        <button
            onClick={handleClearClick}
            // THEME & ANIMATIONS 👇
            className="fixed bottom-5 left-5 md:bottom-8 md:left-8 z-50 flex items-center gap-2 px-4 py-2.5 
                       bg-[#131314]/80 backdrop-blur-md border border-zinc-700/50 
                       text-zinc-400 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.5)]
                       transition-all duration-300 ease-in-out
                       hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 
                       active:scale-90 
                       animate-in fade-in slide-in-from-bottom-4 group"
            title="Clear Search Results"
        >
            {/* Icon mein bhi hover animation hai */}
            <Trash2 className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />

            <span className="text-sm font-medium hidden sm:block pr-1">
                Clear Results
            </span>
        </button>
    );
}

export default ClearSearchButton;