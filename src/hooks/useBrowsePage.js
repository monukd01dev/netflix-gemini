
export default function useBrowsePage() {

    async function handleSearch(searchQuery) {
        console.log(searchQuery)
        return searchQuery
    }


    return {
        handleSearch
    }
}
