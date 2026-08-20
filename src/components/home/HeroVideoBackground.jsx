
import useVideoBackground from "../../hooks/useVideoBackground";

function HeroVideoBackground({ movieId }) {
    const { youTubeKey } = useVideoBackground(movieId);

    if (!youTubeKey) return null;

    return (
        <div className="min-w-full min-h-full absolute pointer-events-none overflow-clip">
            
            <iframe
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  aspect-video w-full scale-250 md:scale-175  order-0"
                src={`https://www.youtube.com/embed/${youTubeKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${youTubeKey}&cc_load_policy=0&iv_load_policy=3`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
            {/*//!testing div */}
            {/* <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  aspect-video w-full scale-250 md:scale-175  order-0 border-4 border-blue-400 bg-white"></div> */}

            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-linear-to-t from-black/90  via-black/50 via-15% to-transparent to-40%"></div>
        </div>
    );
}

export default HeroVideoBackground;