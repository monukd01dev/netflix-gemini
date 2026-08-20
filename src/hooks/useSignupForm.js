import { useState, useRef } from "react";
import { useNavigate } from "react-router"; 
import toast from "react-hot-toast";
import { runValidator } from "../validation/runValidator";
import { registrationSchema } from "../validation/domains/auth";
import { getAuthErrorMessage } from "../utils/firebaseErrors";
import {signupAndSetName} from '../services/auth.service'

export function useSignupForm() {
    const [formErrors, setFormErrors] = useState({});
    const [rootFormError, setRootFormError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const fullNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 2. Gather all data, including the name
        const rawData = { 
            fullName: fullNameRef.current.value,
            email: emailRef.current.value, 
            password: passwordRef.current.value 
        };
        console.log(rawData)
        const validationResponse = runValidator(registrationSchema, rawData);
        console.log(validationResponse)
        // 3. CRITICAL FIX: The early return
        if (!validationResponse.success) {
            setFormErrors(validationResponse.errors);
            return; // If you forget this, Firebase tries to create an account anyway!
        }

        // 4. Guard clause for clearing errors
        if (Object.keys(formErrors).length > 0) setFormErrors({});
        setRootFormError(null);

        // 5. Toast ID caching
        setIsSubmitting(true);

        try {
            // 6. Execute the actual Firebase function
            const userCredential = await signupAndSetName(rawData.email, rawData.password, rawData.fullName);
            console.log(userCredential)
            // 7. Success! Replace the loading toast with a success message
            toast.success("Welcome to Netflix Gemini!");
            navigate('/app', { replace: true });
            
        } catch (error) {
            console.error("Firebase Signup Error:", error.code);
            const friendlyMessage = getAuthErrorMessage(error.code);
            
            setRootFormError(friendlyMessage);
            // Replace the loading toast with the error message
            
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        handleSubmit,
        formErrors,
        rootFormError,
        isSubmitting,
        fullNameRef,
        emailRef,
        passwordRef
    };
}