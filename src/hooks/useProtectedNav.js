import { useState } from 'react';
import useAuthStore from '../store/authStore';

function useProtectedNav(ratio) {
    const currentUser = useAuthStore((state) => state.currentUser)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Safely get the first letter of the user's name, fallback to "U"
    const userInitial = currentUser?.displayName?.charAt(0).toUpperCase() || "U";

    // ratio 1 se 0 ki taraf girti hai.
    // Ise ulta (0 se 1) karne ke liye hum (1 - ratio) use karenge.
    const scrollFactor = 1 - ratio; // Top par 0 hoga, aur jab div gayab hoga toh 1 ho jayega.

    // 1. Glass Opacity: Jab div puri tarah gayab (scrollFactor = 1) ho jaye, toh 0.85 opacity ho.
    const glassOpacity = scrollFactor * 0.85;

    // 2. Blur Amount: Jab div puri tarah gayab ho, toh 12px blur ho.
    const blurAmount = scrollFactor * 12;

    // 3. Gradient Opacity: Ye top par (ratio = 1) dikhna chahiye, aur div gayab hote hi 0 ho jana chahiye.
    const gradientOpacity = ratio;
    return {
        isDropdownOpen,
        setIsDropdownOpen,
        userInitial,
        glassOpacity,
        blurAmount,
        gradientOpacity
    }
}

export default useProtectedNav
