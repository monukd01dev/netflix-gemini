

import DynamicTyper from '../components/gemini/DynamicTyper';
import GeminiGradientBackground from '../components/gemini/GeminiGradientBackground';
import GeminiSearchBar from '../components/gemini/GeminiSearchBar';
import { DYNAMIC_TYPER_CONFIG } from '../utils/constants';
function BrowsePage() {


    return (
        <GeminiGradientBackground>
            <DynamicTyper
                fixedText={DYNAMIC_TYPER_CONFIG.FIXED_TEXT}
                typingTexts={DYNAMIC_TYPER_CONFIG.DYAMIC_TEXT}
                mode={DYNAMIC_TYPER_CONFIG.MODE}
                speed={DYNAMIC_TYPER_CONFIG.SPEED}
            />
            <GeminiSearchBar />
        </GeminiGradientBackground>
    );
}

export default BrowsePage;
