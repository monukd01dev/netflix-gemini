import { useState } from "react";
import { runValidator } from "../validation/runValidator";
import { aiSearchSchema } from "../validation/domains/aiSearch";

function useGeminiSearchBar(onSearch) {

    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [searchBarError, setSearchBarError] = useState(null);
    const isDisabled = query.trim().length < 2;

    const handleSubmit = async (e) => {
        e.preventDefault();

        //early return if query is not valid
        //why this is important cause even if the button is disabled if user pressEnter form will submit 
        if (isDisabled) return;

        // validate the form
        const validationResponse = runValidator(aiSearchSchema, { searchQuery: query })

        //result object pattern failure actions
        if (!validationResponse.success) {
            console.log("[ERROR BLOCK] ", validationResponse)
            setSearchBarError(validationResponse.errors)
            return;
        }

        if (searchBarError) setSearchBarError(null);
        //await here is for the UX, so user can see its searched query and it removed after the after successfull search
        await onSearch(query);
        setQuery("");

    }

    return {
        isFocused,
        setIsFocused,
        handleSubmit,
        setQuery,
        query,
        isDisabled,
        searchBarError,
        setSearchBarError,
    }
}

export default useGeminiSearchBar
