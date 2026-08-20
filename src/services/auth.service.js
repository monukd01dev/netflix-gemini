import { auth } from "./firebase.service";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";

//authServices
// Sign Up Function
async function signupAndSetName(email, password, name) {
    // 1. Create the user (This triggers the listener with name = null)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // 2. Update the name on Google's servers
    await updateProfile(userCredential.user, { displayName: name });

    // 3. Force Firebase to pull the fresh data
    await auth.currentUser.reload();

    // 4. Manually update the React state so the UI updates instantly
    // setCurrentUser({ ...auth.currentUser });

    return userCredential;
}

// Log In Function
function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// Log Out Function
function logout() {
    return signOut(auth);
}

export {
    signupAndSetName,
    signin,
    logout
}