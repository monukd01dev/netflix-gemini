

function GeminiGradientBackground({children}) {
  return (
    // 1. Main wrapper: Black background, screen height, aur overflow-hidden (taaki glows bahar na nikle)
        <div className="relative w-full min-h-screen bg-[#0B0F19] overflow-hidden flex flex-col items-center pb-10">
            
            {/* ========================================= */}
            {/* 2. GEMINI STYLE MESH GRADIENT GLOWS (BACKGROUND) */}
            {/* ========================================= */}
            
            {/* Top Left - Deep Blue */}
            <div className="absolute -top-20 -left-20 w-100 h-100 bg-blue-600/40 rounded-full blur-[120px] animate-pulse [animation-duration:5s]"></div>
            
            {/* Bottom Right - Fuchsia / Pink */}
            <div className="absolute -bottom-20 -right-20 w-125 h-125 bg-fuchsia-600/30 rounded-full blur-[250px] animate-pulse [animation-duration:4s]"  style={{ animationDelay: '1s' }}></div>
            
            {/* Center - Deep Purple */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 bg-purple-600/30 rounded-full blur-[100px] animate-pulse [animation-duration:5s]" style={{ animationDelay: '2s' }}></div>

            {children}
            
        </div>
  )
}

export default GeminiGradientBackground
