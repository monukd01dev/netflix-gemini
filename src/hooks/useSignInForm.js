import { useState, useRef } from "react";
import { useNavigate } from "react-router"; 
import toast from "react-hot-toast";
import { runValidator } from "../validation/runValidator";
import { loginSchema } from "../validation/domains/auth";
import { getAuthErrorMessage } from "../utils/firebaseErrors";
import {signin} from '../services/auth.service'
export function useSignInForm() {
    const [formErrors, setFormErrors] = useState({});
    const [rootFormError, setRootFormError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Gather signin data
        const rawData = { 
            email: emailRef.current.value, 
            password: passwordRef.current.value 
        };

        const validationResponse = runValidator(loginSchema, rawData);
        
        // 2. Early return if validation fails
        if (!validationResponse.success) {
            setFormErrors(validationResponse.errors);
            return; 
        }

        // 3. Clear previous errors if validation passes
        if (Object.keys(formErrors).length > 0) setFormErrors({});
        setRootFormError(null);

        // 4. Start submission UI
        setIsSubmitting(true);

        try {
            // 5. Execute Firebase signin
            await signin(rawData.email, rawData.password);
            
            toast.success("Welcome back to Netflix Gemini!");
            navigate('/app', { replace: true });
            
        } catch (error) {
            console.error("Firebase SignIn Error:", error.code);
            const friendlyMessage = getAuthErrorMessage(error.code);
            
            setRootFormError(friendlyMessage);
            
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        handleSubmit,
        formErrors,
        rootFormError,
        isSubmitting,
        emailRef,
        passwordRef
    };
}