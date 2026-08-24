import { useState } from "react"
import { getMovieRecommendationsAI } from "../services/ai/movieAI.service"

export default function useBrowsePage() {

    const [isFetching ,setIsFetching] = useState(false)

    async function handleSearch(searchQuery) {
        console.log(`[FROM HandleSubmit ] `,searchQuery)
        //using the gemini api
        try{
            setIsFetching(true)
            const response = await getMovieRecommendationsAI(searchQuery)
            console.log(response)
            
        }catch(error){
            console.log(error)
        }finally{
            setIsFetching(false)
        }
        
    }


    return {
        handleSearch,
        isFetching
    }
}
