import MovieCard from "./MovieCard"


function MovieList({title, movieList}) {
  return (

    <div className=" px-4 md:px-12 mt-4"> 
      <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-5">
        {title}
      </h2>
      <div className="w-full flex gap-3 md:gap-4 overflow-x-scroll  py-4 scrollbar-hide">
        {
            movieList.map(movie => <MovieCard key={movie.id} posterPath={movie.poster_path}/>)
        }
      </div>
    </div>
  )
}

export default MovieList;
