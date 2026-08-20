import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../services/firebase.service";
import useAuthStore from "../store/authStore";

export default function useAuthEventChange() {
    
    //loading for the onAuthStateChanged check at the time of mounting
    const [loading, setLoading] = useState(true)//in starting loading is true 
    const setCurrentUser = useAuthStore((state) => state.setCurrentUser)

    //onMount side Effect
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user); 
            setLoading(false); // We got the answer from Firebase, stop loading
        });

        // Cleanup the listener when the component unmounts
        return unsubscribe;
    }, []);

    return {
        loading
    }
}
