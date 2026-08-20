import { create } from "zustand";

const store = (set) => ({

    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    trendingMovies: null,
    actionMovies: null,

    setMoviesCategory: (categoryName,movies) => {
        set({[categoryName]: movies })
    }
})

const useMovieStore = create(store);

export default useMovieStore;