import { useState, useEffect } from 'react';

function DynamicTyper({
    fixedText = "I am a ",
    typingTexts = ["Developer", "Designer", "Creator"],
    mode = "typing",
    speed = 100
}) {
    // Hamare 3 core states
    const [displayText, setDisplayText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        // Current word jo array se mila hai
        const currentFullWord = typingTexts[wordIndex];

        // MODE 1: Whole Word Display
        if (mode === "word") {
            setDisplayText(currentFullWord);

            const timer = setTimeout(() => {
                // Loop back to 0 if at the end of the array
                setWordIndex((prev) => (prev + 1) % typingTexts.length);
            }, speed * 10); // Multiply by 10 to give enough time to read the whole word

            return () => clearTimeout(timer); // Cleanup is crucial!
        }

        // MODE 2: Typing Effect
        if (mode === "typing") {
            let timer;

            // Dynamic typing speed: deleting is usually faster than typing
            const typingSpeed = isDeleting ? speed / 2 : speed;

            // Logic A: Word is fully typed -> Pause, then start deleting
            if (!isDeleting && displayText === currentFullWord) {
                timer = setTimeout(() => setIsDeleting(true), 1500); // 1.5s pause
            }
            // Logic B: Word is fully deleted -> Move to next word, start typing
            else if (isDeleting && displayText === "") {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % typingTexts.length);
            }
            // Logic C: Currently typing or deleting character by character
            else {
                timer = setTimeout(() => {
                    const nextText = isDeleting
                        // Slice removes the last character
                        ? currentFullWord.substring(0, displayText.length - 1)
                        // Adds the next character
                        : currentFullWord.substring(0, displayText.length + 1);

                    setDisplayText(nextText);
                }, typingSpeed);
            }

            return () => clearTimeout(timer); // Prevent memory leaks
        }
    }, [displayText, isDeleting, wordIndex, typingTexts, mode, speed]);

    return (

        <div className="flex min-w-50 sm:w-fit justify-start sm:justify-center px-4 sm:px-6 sm:mb-3  ">
            <div className="flex items-center justify-start  sm:min-w-[380px] md:min-w-[400px]  h-[3rem] sm:h-[4rem] text-lg sm:text-2xl md:text-3xl font-bold text-white overflow-hidden">
                <span className="mr-2 whitespace-nowrap">{fixedText}</span>
                <span className="text-blue-400 whitespace-nowrap">
                    {displayText}
                    <span className="ml-1 animate-pulse border-r-2 md:border-r-[3px] border-white h-[1em] inline-block align-middle"></span>
                </span>
            </div>
        </div>
    );
}

export default DynamicTyper;