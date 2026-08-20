import { Info, Play } from 'lucide-react';

function HeroDetailsOverlay({ title, overView }) {
    return (
        <div className="relative w-full h-full z-20">
            <div className="absolute bottom-[15%] md:bottom-[30%] w-full pl-4  md:pl-12 ">
                <div className="w-[50%] md:w-[45%] lg:w-[35%]">
                    <h1 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg mb-2 md:mb-4">
                        {title}
                    </h1>

                    <p className="text-white/90 hidden md:visible text-xs md:text-sm drop-shadow-md mb-4 line-clamp-2 sm:line-clamp-3">
                        {overView}
                    </p>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    <button className="flex items-center justify-center gap-1.5 md:gap-2 bg-white text-black px-3 py-2 md:px-5 md:py-3  lg:py-2.5 rounded-sm md:rounded font-semibold text-xs md:text-sm lg:text-lg hover:bg-white/80 transition-colors">
                        <Play className="w-3 h-3 md:w-5 md:h-5 fill-current" /> Play
                    </button>

                    <button className="flex items-center justify-center gap-1.5 md:gap-2 bg-zinc-500/70 text-white px-3 py-2 md:px-5 md:py-3  lg:py-2.5 rounded-sm md:rounded font-semibold text-xs md:text-sm lg:text-lg hover:bg-zinc-500/90 transition-colors backdrop-blur-sm">
                        <Info className="w-3 h-3 md:w-5 md:h-5" /> More Info
                    </button>
                </div>
            </div>

        </div>
    );
}

export default HeroDetailsOverlay;
