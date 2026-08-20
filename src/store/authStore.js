import { create } from "zustand";

// create() ek function return karta hai jo ek hook ban jata hai (useAuthStore)
// set ek built-in function hai jo state update karne ke kaam aata hai
const useAuthStore = create((set) => ({

    // 1. Initial State
    currentUser: null,

    // 2. Action to update the state
    setCurrentUser: (user) => {
        // set() purani state ko leta hai aur nayi state usme merge kar deta hai, merge is important here
        set({ currentUser: user });
    },

    // Optional: Agar future mein extra actions chahiye (jaise logout pe clear karna)
    clearUser: () => {
        set({ currentUser: null });
    }
}));

export default useAuthStore;