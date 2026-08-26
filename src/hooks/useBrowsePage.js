
import toast from "react-hot-toast";
import { getAIMovieRecommendations } from "../services/ai/movieAI.service"
import useAIMovieStore from "../store/aiMovieStore"
import { AI_ERROR_MESSAGES } from "../validation/errorCode";
import { fetchMultipleMoviesByName } from "../services/tmdb.service";
import { useRef } from "react";
export default function useBrowsePage() {

    const isAILoading = useAIMovieStore(state => state.isAILoading);
    const setIsAILoading = useAIMovieStore(state => state.setIsAILoading);
    const setAiRecomendedMoviesData = useAIMovieStore(state => state.setAiRecomendedMoviesData)
    const aiRecomendedMoviesData = useAIMovieStore(state => state.aiRecomendedMoviesData)


    //for focusing on clearStore
    const searchInputRef = useRef(null);

    const handleClearAndFocus = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };
    const handleSearch = async function (searchQuery) {
        console.log(`[FROM HandleSubmit ] `, searchQuery)
        //clearing the store for second search
        setAiRecomendedMoviesData(null)
        setIsAILoading(true)
        //Step-1
        //using the gemini api 
        console.log("Started Getting Recomendation")
        const aiResponse = await getAIMovieRecommendations(searchQuery)

        if (!aiResponse.success) {
            setIsAILoading(false)
            console.log(aiResponse.error)
            const errorMessage = AI_ERROR_MESSAGES[aiResponse.error] || AI_ERROR_MESSAGES.DEFAULT
            toast.error(errorMessage)
            return;
        }

        console.log("Successfully Get the recomendation : ", aiResponse)

        //step-2
        const movieNamesArray = aiResponse.data;
        console.log("fetching these recomendation : ", movieNamesArray)
        const tmdbResponse = await fetchMultipleMoviesByName(movieNamesArray);

        if(!tmdbResponse.success){
            setIsAILoading(false)
            toast.error("Something went wrong while fetching the movies")
            return;
        }


        setAiRecomendedMoviesData(tmdbResponse.data)
        console.log(tmdbResponse.data)
        setIsAILoading(false)
        return;
    }


    return {
        handleSearch,
        isAILoading,
        aiRecomendedMoviesData,
        searchInputRef,
        handleClearAndFocus
    }
}
