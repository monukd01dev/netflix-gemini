import useHeroBanner from "../../hooks/useHeroBanner"
import HeroDetailsOverlay from "./HeroDetailsOverlay"
import HeroVideoBackground from "./HeroVideoBackground"
import { HeroBannerShimmer } from "./HeroBannerShimmer";

function HeroBanner() {
    const { nowPlayingMovies, bannerMovieId, bannerMovieOverview, bannerMovieTitle } = useHeroBanner();


    if (!nowPlayingMovies) {
        return <HeroBannerShimmer />;
    }

    return (
        
        <div className="relative w-full h-75 md:h-125 lg:h-175 overflow-clip bg-black ">
            <HeroVideoBackground movieId={bannerMovieId} />
            <HeroDetailsOverlay title={bannerMovieTitle} overView={bannerMovieOverview} />
        </div>
    );
}

export default HeroBanner;