import { ArrowUp } from 'lucide-react';

function ScrollToTopButton({ progress }) {

    const isVisible = progress > 5;
    const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <button
            onClick={handleScrollTop}
            className={`
                fixed z-50 flex items-center justify-center rounded-full cursor-pointer shadow-xl 
                transition-all duration-300 ease-out
                bottom-4 right-4 w-11 h-11 
                md:bottom-6 md:right-6 md:w-14 md:h-14 
                hover:scale-110 hover:shadow-red-500/20 
                active:scale-90 
                bg-black/40 backdrop-blur-md border border-white/10
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
            `}
        >
            {/* 4. THE PROGRESS RING (Using Mask to hollow out the center) */}
            <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                    // Red for progress, subtle white/gray for the remaining track
                    background: `conic-gradient(#ef4444 ${progress}%, rgba(255, 255, 255, 0.1) ${progress}%)`,
                    // Ye jadoo hai jo beech ka hissa kaat kar sirf ring chhodta hai (80% transparent center)
                    WebkitMaskImage: 'radial-gradient(closest-side, transparent 80%, black 82%)',
                    maskImage: 'radial-gradient(closest-side, transparent 80%, black 82%)'
                }}
            ></div>

            {/* ICON: Responsive icon size (w-5 for mobile, w-6 for desktop) */}
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10" />
        </button>
    );
}

export default ScrollToTopButton;