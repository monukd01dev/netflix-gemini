import { TMDB_IMG_BASE } from "../../utils/constants"


function MovieCard({ posterPath }) {
  if (!posterPath) return null; 

  return (

    <div className="shrink-0 cursor-pointer overflow-hidden rounded-md w-28 sm:w-32 md:w-40 lg:w-48">
      
      <div 
        className="w-full aspect-2/3 bg-center bg-cover hover:scale-110 transition-transform duration-300 ease-in-out"
        style={{ backgroundImage: `url(${TMDB_IMG_BASE}${posterPath})` }}
      >
      </div>

    </div>
  )
}

export default MovieCard;
