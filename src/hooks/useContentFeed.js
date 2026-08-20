import { useEffect, useState } from "react";
import useMovieStore from "../store/movieStore"
import { MOVIES_CATEGORY } from "../utils/constants";
import requests from "../utils/tmdbRequests";
import tmdb from "../utils/axios"

const categoriesToFetch = [
    { storeKey: MOVIES_CATEGORY.POPULAR_MOVIES, endpoint: requests.fetchPopularMovies },
    { storeKey: MOVIES_CATEGORY.TOP_RATED_MOVIES, endpoint: requests.fetchTopRated },
    { storeKey: MOVIES_CATEGORY.TRENDING_MOVIES, endpoint: requests.fetchTrending },
    { storeKey: MOVIES_CATEGORY.ACTION_MOVIES, endpoint: requests.fetchActionMovies },
]


function useContentFeed() {

    const setMoviesCategory = useMovieStore(state => state.setMoviesCategory);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAllMovies() {
            try {
                //jaldi se saari api send karke ek promises ka array bana lenge
                const apiPromises = categoriesToFetch.map(category => tmdb.get(category.endpoint))
                const result = await Promise.all(apiPromises)

                //setting the movies in the store
                result.forEach((response, index) => {
                    const storeKey = categoriesToFetch[index].storeKey;
                    setMoviesCategory(storeKey, response?.data?.results)
                })
            } catch (error) {
                console.error("Error fetching content feed:", error);
            } finally {
                setLoading(false)
            }

        }
        fetchAllMovies();
    }, [setMoviesCategory])

    return {loading}
}

export default useContentFeed
