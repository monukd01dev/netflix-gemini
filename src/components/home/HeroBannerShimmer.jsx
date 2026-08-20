export function HeroBannerShimmer() {
    return (
        <div className="relative 
        w-full h-75 md:h-125 lg:h-175 overflow-clip  bg-[#141414] animate-pulse flex flex-col justify-center  px-4 md:px-12 ">

            <div className="w-3/5 mt-10 md:mt-0 max-w-md h-8 md:h-12 lg:h-16 bg-zinc-800/80 rounded-md mb-4 md:mb-6"></div>


            <div className="sm:block space-y-2 mb-6">
                <div className="w-[70%] lg:w-full lg:max-w-lg h-3 md:h-4 bg-zinc-800/80 rounded-md"></div>
                <div className="w-[60%] lg:w-full lg:max-w-md h-3 md:h-4 bg-zinc-800/80 rounded-md"></div>
                <div className="w-[50%] lg:w-full lg:max-w-sm h-3 md:h-4 bg-zinc-800/80 rounded-md"></div>
            </div>


            <div className="flex gap-3">
                <div className="w-24 md:w-32 h-8 md:h-12 bg-zinc-800/80 rounded-md"></div>
                <div className="w-28 md:w-36 h-8 md:h-12 bg-zinc-800/80 rounded-md"></div>
            </div>
        </div>
    );
}