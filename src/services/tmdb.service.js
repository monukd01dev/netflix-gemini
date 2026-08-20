import axios from 'axios';
import tmdb from '../utils/axios';
import requests from '../utils/tmdbRequests';


export const fetchMovies = async (pageNumber = 1) => {
    try {
        const response = await tmdb.get(requests.fetchMovies, {
            params: {
                language: "en-US",
                page: pageNumber
            }
        })

        return response?.data;
    } catch (error) {
        console.error("TMDB Fetch Error:", error);
    }
}

export const fetchRegionalMovies = async (pageNumber = 1, country = "IN", region = "IN", lang = "hi") => {
    try {
        const response = await tmdb.get(requests.fetchMovies, {
            // Axios will automatically convert this object into a URL query string
            // e.g., ?with_origin_country=IN&with_original_language=hi&page=2
            params: {
                with_origin_country: country,     // Fetch movies produced in India
                with_original_language: lang,  // Specifically Hindi movies
                region: region,                  // Get Indian release dates
                sort_by: 'popularity.desc',    // Most popular first
                page: pageNumber               // Dynamic page number for pagination
            }
        });

        console.log("Current Page:", response.data.page);
        console.log("Total Pages Available:", response.data.total_pages);
        console.log("Movies List:", response.data.results);

        return response?.data;

    } catch (error) {
        console.error("TMDB Fetch Error:", error);
    }
};

export const fetchNowPlayingMovies = async () => {
    try {
        const response = await tmdb.get(requests.fetchNowPlayingMovies);
        return response?.data;
    } catch (error) {
        console.error("TMDB Fetch Error:", error);
    }
}

export const fetchMovieVideos = async (movie_id, lang = "en-US") => {
    try {
        const response = await tmdb.get(`/movie/${movie_id}/videos`, {
            params: {
                language: lang,
            }
        })

        return response.data;
    } catch (error) {
        console.error("TMDB Fetch Error:", error);
    }
}