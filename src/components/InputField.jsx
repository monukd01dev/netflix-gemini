import { CircleX } from "lucide-react"

function InputField({ type = "text", name, id, placeholder, error, rightElement, ref }) {
    return (
        <div className="w-full">
            {/* We make this a relative container so we can position the rightElement inside it */}
            <div className="relative w-full">
                <input
                    className={`w-full h-14 px-4 pr-12 text-white bg-zinc-800/70 border ${error ? "border-red-500" : "border-zinc-500"
                        } rounded-sm focus:outline-2 focus:outline-zinc-200 focus:outline-offset-2 focus:bg-zinc-800 transition-all`}
                    type={type}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    ref={ref}
                />

                {/* If a rightElement is passed, render it on the right edge */}
                {rightElement && (
                    <div className="absolute right-4 top-0 h-full flex items-center justify-center text-zinc-400">
                        {rightElement}
                    </div>
                )}
            </div>

            {error && (
                <div className="flex w-full mt-1.5 items-center justify-start gap-1.5 text-red-500">
                    <CircleX className="w-4 h-4" />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}
        </div>
    )
}

export default InputField