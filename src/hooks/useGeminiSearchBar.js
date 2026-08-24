import { useState } from "react";
import { runValidator } from "../validation/runValidator";
import { aiSearchSchema } from "../validation/domains/aiSearch";

function useGeminiSearchBar(onSearch) {

    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [searchBarError, setSearchBarError] = useState(null);
    const isDisabled = query.trim().length < 2;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            // validate the form
            const validationResponse = runValidator(aiSearchSchema, { searchQuery: query })

            if (validationResponse.success) {
                if (searchBarError) setSearchBarError(null);
                console.log("[SUCCESS BLOCK] ", validationResponse)
                onSearch(query);
                setQuery("");
            }
            else {
                console.log("[ERROR BLOCK] ", validationResponse)
                setSearchBarError(validationResponse.errors)
            }
            // console.log(validationResponse)

        }
    };



    return {
        isFocused,
        setIsFocused,
        handleSubmit,
        setQuery,
        query,
        isDisabled,
        searchBarError
    }
}

export default useGeminiSearchBar
