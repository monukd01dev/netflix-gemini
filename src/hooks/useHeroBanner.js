import { useEffect, useMemo } from "react";
import { fetchNowPlayingMovies, fetchRegionalMovies } from "../services/tmdb.service";
import useMovieStore from "../store/movieStore"
import { MOVIES_CATEGORY } from "../utils/constants";


function useHeroBanner() {
    const nowPlayingMovies = useMovieStore((state) => state.nowPlayingMovies);
    const setMoviesCategory = useMovieStore((state) => state.setMoviesCategory);

    // 1. Fetch data on mount
    useEffect(() => {
        const loadNowPlayingMovies = async () => {
            try {
                // const data = await fetchRegionalMovies();
                const data = await fetchNowPlayingMovies();
                
                setMoviesCategory(MOVIES_CATEGORY.NOW_PLAYING_MOVIES,data?.results);
            } catch (error) {
                console.error("Failed to load hero banner movies:", error);
            }
        };

        // Only fetch if we don't already have the movies in the store
        if (!nowPlayingMovies) {
            loadNowPlayingMovies();
        }
    }, [nowPlayingMovies, setMoviesCategory]);//nowPlayingMovies cause we are using the it as check for loading movies and setNowplaying Movies for esLint

    // 2. The Magic of useMemo: Freeze the random selection
    const featuredMovie = useMemo(() => {
        if (!nowPlayingMovies || nowPlayingMovies.length === 0) return null;


        const randIndex = Math.floor(Math.random() * nowPlayingMovies.length);
        return nowPlayingMovies[randIndex];

    }, [nowPlayingMovies]); // Dependency array: Only recalculate if the movie list changes

    

    return {
        nowPlayingMovies,
        bannerMovieId: featuredMovie?.id, 
        bannerMovieOverview: featuredMovie?.overview, 
        bannerMovieTitle: featuredMovie?.title
    };
}

export default useHeroBanner;