

function MovieListShimmer() {

    const dummyLists = Array.from({ length: 2 }); 
    const dummyCards = Array.from({ length: 10 }); 

    return (
        // Wrapper ko thoda margin-top de diya taaki Hero Banner se blend ho sake
        <div className="relative z-20 pb-12 -mt-4 md:-mt-8 overflow-hidden">

            {dummyLists.map((_, listIndex) => (
                <div key={listIndex} className="px-4 md:px-12 mt-4 md:mt-8">

                    
                    <div className="w-32 md:w-56 h-6 md:h-8 bg-zinc-800/80 rounded-md mb-3 md:mb-5 animate-pulse"></div>

                    
                    <div className="w-full flex gap-3 md:gap-4 overflow-hidden py-4">

                        {dummyCards.map((_, cardIndex) => (
                            <div
                                key={cardIndex}
                                className="shrink-0 overflow-hidden rounded-md w-28 sm:w-32 md:w-40 lg:w-48 animate-pulse"
                            >
                               
                                <div className="w-full aspect-2/3 bg-zinc-800/80 rounded-md"></div>
                            </div>
                        ))}

                    </div>
                </div>
            ))}

        </div>
    );
}

export default MovieListShimmer;

