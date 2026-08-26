

import DynamicTyper from '../components/gemini/DynamicTyper';
import GeminiGradientBackground from '../components/gemini/GeminiGradientBackground';
import GeminiSearchBar from '../components/gemini/GeminiSearchBar';
import { DYNAMIC_TYPER_CONFIG } from '../utils/constants';
import useBrowsePage from '../hooks/useBrowsePage';
import GeminiLoader from '../components/gemini/GeminiLoader';
import MovieList from '../components/home/MovieList';
import ClearSearchButton from '../components/gemini/ClearSearchButton';
function BrowsePage() {

    const { handleSearch, isAILoading, aiRecomendedMoviesData,searchInputRef,handleClearAndFocus } = useBrowsePage()

    return (
        <GeminiGradientBackground>
            <div className={` w-full flex flex-col justify-center items-center  ${(isAILoading || aiRecomendedMoviesData) ? "pt-20 md:pt-40" : "pt-50 md:pt-65"} transition-all duration-300 ease-in-out`}>
                {
                    !(isAILoading || aiRecomendedMoviesData) && <DynamicTyper
                        fixedText={DYNAMIC_TYPER_CONFIG.FIXED_TEXT}
                        typingTexts={DYNAMIC_TYPER_CONFIG.DYAMIC_TEXT}
                        mode={DYNAMIC_TYPER_CONFIG.MODE}
                        speed={DYNAMIC_TYPER_CONFIG.SPEED}
                    />
                }
                <GeminiSearchBar onSearch={handleSearch} inputRef={searchInputRef} />
            </div>
            {isAILoading && <GeminiLoader />}
            <div className="w-full flex flex-col lg:w-10/12 xl:8/12">
                {
                    (!isAILoading && aiRecomendedMoviesData)
                    && aiRecomendedMoviesData?.map(movieList => <MovieList key={movieList[0].title} title={movieList[0].title} movieList={movieList} />)
                }
            </div>

            {/* clear Store button  */}
            <ClearSearchButton onClearSuccess={handleClearAndFocus} />
        </GeminiGradientBackground>
    );
}

export default BrowsePage;
