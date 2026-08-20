

import { Link } from 'react-router';

function LandingPage() {
    return (

    <header className="
      relative 
      h-screen 
      bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/0ce6c17e-e188-4f13-aaf2-6366e12ba739/web/IN-en-20260803-TRIFECTA-perspective_7730cca2-6324-4104-bf66-1a1f6e1a3e61_small.jpg')] 
      bg-cover 
      bg-center
    ">

            <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>


            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">


                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-3xl leading-tight">
                    Unlimited movies, TV shows, and more
                </h1>

                <p className="mt-4 text-lg md:text-2xl text-white font-medium">
                    Watch anywhere. Cancel anytime.
                </p>

                <Link
                    to="/signin"
                    className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded text-lg md:text-xl transition-colors"
                >
                    Get Started &gt;
                </Link>

            </div>

        </header>
    );
}

export default LandingPage;


