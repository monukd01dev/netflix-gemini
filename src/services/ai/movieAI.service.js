import { AI_CLIENT_CONFIG } from "../../utils/aiConstants"
import aiClient from "./ai.client"
import toast from "react-hot-toast"
/**
 * AI Service: Fetches movie recommendations and returns a strict Result Contract.
 * 
 * @param {string} userInput 
 * @returns {Promise<{success: true, data: string[]} | {success: false, error: string}>}
 */
export const getMovieRecommendationsAI = async function (userInput) {
    try {
        
        const response = await aiClient.interactions.create({
            model : AI_CLIENT_CONFIG.MODEL,
            input : userInput,
            generation_config : {
                temperature : AI_CLIENT_CONFIG.TEMPERATURE,
            },
            system_instruction : AI_CLIENT_CONFIG.SYSTEM_INSTRUCTION
        })

        //checking the text
        let rawText = response.output_text || '';

        //removing the markdown playing defensive here 
        rawText = rawText.replace(/`/g, '').replace(/\n/g, '');

        //prearing the array movie array
        const moivesArray = rawText.split(",")
                                .map(movieName => movieName.trim().toLocaleLowerCase())
                                .filter(Boolean)
        // console.log(moviesArray)
        return {
            success: true,
            data: moivesArray // ["movie 1", "movie 2", ...]
        };

    } catch (error) {
        console.log(error)

        let errorCode = "AI_UNKNOWN_ERROR";
        
        if (error.status === 429) {
            errorCode = "AI_RATE_LIMIT"
            toast.error("API Limit Reached")
        };
        if (error.status === 401) {
            errorCode = "AI_AUTH_FAILED"
            toast.error("API Auth Failed")
        };
        if(error.status === 404) {
            errorCode = "AI_MODEL_NOT_FOUND"
            toast.error("AI model not found")
        }

        // 6. Error Contract
        return {
            success: false,
            error: errorCode
        };
    }
}