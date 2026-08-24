function GeminiLoader({ message = "AI is thinking..." }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 animate-in fade-in duration-500">
            
            {/* The Animated Morphing Blob */}
            <div className="w-16 h-16 md:w-20 md:h-20 ai-blob-loader shadow-[0_0_30px_rgba(66,133,244,0.4)]"></div>
            
            {/* Glowing Loading Text */}
            <p className="mt-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 font-medium text-sm md:text-base animate-pulse">
                {message}
            </p>
            
        </div>
    );
}

export default GeminiLoader;