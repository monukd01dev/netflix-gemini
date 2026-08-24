import { ArrowUp, AlertCircle } from 'lucide-react'; 
import useGeminiSearchBar from '../../hooks/useGeminiSearchBar';

function GeminiSearchBar({ onSearch }) {
    const { isFocused, setIsFocused, handleSubmit, query, setQuery, isDisabled, searchBarError } = useGeminiSearchBar(onSearch);

    return (
        <div className="w-full max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-6">
            
            {/* THE ANIMATED RGB GRADIENT BORDER */}
            <div 
                className={`relative rounded-full p-0.5 transition-all duration-500 ${
                    isFocused 
                    ? "bg-linear-to-r from-blue-500 via-purple-500 to-fuchsia-500 animate-rgb-border shadow-[0_0_20px_rgba(168,85,247,0.3)]" 
                    : "bg-zinc-700/50 hover:bg-zinc-600"
                }`}
            >
                <form 
                    onSubmit={handleSubmit}
                    className="flex items-center gap-2 md:gap-3 bg-[#131314] rounded-full px-4 md:px-5 py-2 md:py-3 w-full"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask Gemini for 'Best Oscar winning movies'..."
                        className="flex-1 bg-transparent border-none pl-4 outline-none text-white text-sm md:text-base placeholder:text-zinc-400 w-full"
                        autoComplete="off"
                    />

                    <div className="flex items-center gap-2 md:gap-3 shrink-0 text-zinc-400">
                        <button 
                            type="submit" 
                            disabled={isDisabled}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isDisabled 
                                ? "bg-transparent text-zinc-600 cursor-not-allowed"
                                : "bg-[#1b66d2] text-white hover:bg-[#1a73e8] cursor-pointer shadow-md" 
                            }`}
                        >
                            <ArrowUp className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                        </button>
                    </div>
                </form>
            </div>
            
            {/* 🚨 PREMIUM ERROR UI YAHAN HAI 🚨 */}
            {searchBarError?.searchQuery?.[0] && (
                <div className="flex items-center gap-2 mt-3 px-4 text-red-400/90 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{searchBarError.searchQuery[0]}</span>
                </div>
            )}
            
        </div>
    );
}

export default GeminiSearchBar;