import { useEffect, useState } from "react"
import { fetchMovieVideos } from "../services/tmdb.service";


function useVideoBackground(movieId) {
    const [youTubeKey, setYouTubeKey] = useState(null);

    useEffect(() => {
        // no movieId , no API call (Safety check)
        if (!movieId) return;

        async function init() {
            try {
                const movieVideos = await fetchMovieVideos(movieId);
                const videos = movieVideos?.results;

                //safety check 
                if (!videos || videos.length === 0) return;

                const trailerVideo = videos.find((video) => video.type === "Trailer");
                const trailer = trailerVideo || videos[0];

                setYouTubeKey(trailer.key);
            } catch (error) {
                console.error("Failed to fetch movie videos", error);
            }
        }

        init();
    }, [movieId])

    return { youTubeKey }
}

export default useVideoBackground;
