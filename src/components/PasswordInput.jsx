import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputField from "./InputField";

function PasswordInput({ name, id, placeholder, error, ref }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const eyeButton = (
        <button
            type="button" // Prevents the button from submitting the form!
            onClick={toggleVisibility}
            className="hover:text-white transition-colors cursor-pointer"
        >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
    );

    return (
        <InputField
            // We dynamically change the type based on state
            type={showPassword ? "text" : "password"}
            name={name}
            id={id}
            placeholder={placeholder}
            error={error}
            // We pass our toggle button to the generic input
            rightElement={eyeButton}
            ref={ref}
        />
    );
}

export default PasswordInput;