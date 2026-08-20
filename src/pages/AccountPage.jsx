import { Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router'; // React Router v7 hook

function AccountPage() {
    const navigate = useNavigate();

    return (
        // 1. Main wrapper: Black background, screen height, aur overflow-hidden (taaki glows bahar na nikle)
        <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-hidden flex justify-center items-center">
            
            {/* ========================================= */}
            {/* 2. GEMINI STYLE MESH GRADIENT GLOWS (BACKGROUND) */}
            {/* ========================================= */}
            
            {/* Top Left - Deep Blue */}
            <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-blue-600/40 rounded-full blur-[120px] animate-pulse"></div>
            
            {/* Bottom Right - Fuchsia / Pink */}
            <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-fuchsia-600/30 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Center - Deep Purple */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            
            {/* ========================================= */}
            {/* 3. GLASSMORPHISM CONTENT CARD (FOREGROUND) */}
            {/* ========================================= */}
            
            {/* z-10 rakha hai taaki background glows ke upar rahe */}
            <div className="relative z-10 flex flex-col items-center justify-center p-8 md:p-14 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] text-center max-w-lg mx-4">
                
                {/* Floating Icon */}
                <div className="p-4 bg-white/5 rounded-2xl mb-6 border border-white/10 shadow-inner">
                    <Sparkles className="w-8 h-8 text-blue-400 animate-bounce" />
                </div>

                {/* Gradient Text (The real Gemini feel) */}
                <h1 className="text-3xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-400">
                    Coming Soon
                </h1>
                
                <p className="text-white/70 text-sm md:text-base font-medium leading-relaxed mb-8">
                    We're brewing something magical behind the scenes. This page is currently under development. Stay tuned!
                </p>

                {/* Sleek Action Button */}
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>

            </div>
        </div>
    );
}

export default AccountPage;