import { useShallow } from "zustand/shallow"
import useContentFeed from "../../hooks/useContentFeed"
import useMovieStore from "../../store/movieStore"
import MovieList from "./MovieList"
import MovieListShimmer from "./MovieListShimmer"


function ContentFeed() {
  const { loading } = useContentFeed()

  const {
    nowPlayingMovies,
    trendingMovies,
    topRatedMovies,
    actionMovies,
    popularMovies
  } = useMovieStore(
    useShallow(state => ({
      nowPlayingMovies: state.nowPlayingMovies,
      trendingMovies: state.trendingMovies,
      topRatedMovies: state.topRatedMovies,
      actionMovies: state.actionMovies,
      popularMovies: state.popularMovies
    }))
  )

  if (loading)
    return <MovieListShimmer />;
  return (
    <div className="pb-10">
      {nowPlayingMovies?.length > 0 &&
        <MovieList title={"Now Playing"} movieList={nowPlayingMovies} />
      }

      {trendingMovies?.length > 0 &&
        <MovieList title={"Trending Now"} movieList={trendingMovies} />
      }

      {topRatedMovies?.length > 0 &&
        <MovieList title={"Top Rated"} movieList={topRatedMovies} />
      }

      {actionMovies?.length > 0 &&
        <MovieList title={"Action Thrillers"} movieList={actionMovies} />
      }
      {popularMovies?.length > 0 &&
        <MovieList title={"Popular Movies"} movieList={popularMovies} />
      }
    </div>
  )
}

export default ContentFeed
