
const requests = {
    fetchMovies: `/discover/movie`,
    fetchTrending: `/trending/all/week`,
    fetchNetflixOriginals: `/discover/tv?with_networks=213`,
    fetchTopRated: `/movie/top_rated`,
    fetchActionMovies: `/discover/movie?with_genres=28`, // 28 is the TMDB ID for Action
    fetchComedyMovies: `/discover/movie?with_genres=35`, // 35 is Comedy
    fetchHorrorMovies: `/discover/movie?with_genres=27`, // 27 is Horror
    fetchRomanceMovies: `/discover/movie?with_genres=10749`,
    fetchDocumentaries: `/discover/movie?with_genres=99`,
    fetchNowPlayingMovies : `/movie/now_playing`,
    fetchPopularMovies : `/movie/popular`
};

export default requests;