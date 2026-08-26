import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
const store = (set) => ({

    //states
    aiRecomendedMovies: null,
    aiRecomendedMoviesData: null,
    isAILoading: false,

    //actions
    setAiRecomendedMovies: (movies) => set({ aiRecomendedMovies: movies }),
    setAiRecomendedMoviesData: (data) => set({ aiRecomendedMoviesData: data }),
    setIsAILoading: (status) => set({ isAILoading: status }),

    //clear store 
    clearAIMovieStore: () => set({
        aiRecomendedMovies: null,
        aiRecomendedMoviesData: null,
        isAILoading: false,

    })
})

const useAIMovieStore = create(devtools(persist(store, { name: "Netflix-Gemini-aiMovieStore" }), { name: "aiMovieStore" }));

export default useAIMovieStore;