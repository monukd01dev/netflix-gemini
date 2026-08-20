// src/utils/firebaseErrors.js

// src/utils/firebaseErrors.js

export const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    // ----------------------------------------
    // USER INPUT ERRORS (Their fault)
    // ----------------------------------------
    case 'auth/invalid-credential':
      // Note: Firebase combined user-not-found and wrong-password into this single error 
      // recently to prevent hackers from guessing which emails are registered.
      return "Incorrect email or password. Please try again.";
    
    case 'auth/user-not-found': // Kept for legacy Firebase configurations
      return "We couldn't find an account with that email.";
      
    case 'auth/wrong-password': // Kept for legacy Firebase configurations
      return "Incorrect password. Please try again.";

    case 'auth/email-already-in-use':
      return "An account with this email already exists. Try signing in.";

    case 'auth/invalid-email':
      return "Please enter a valid email address.";

    case 'auth/weak-password':
      return "Your password is too weak. Please use a stronger password.";

    // ----------------------------------------
    // ACCOUNT STATUS ERRORS (Administrative)
    // ----------------------------------------
    case 'auth/user-disabled':
      return "This account has been disabled. Please contact support.";

    case 'auth/too-many-requests':
      return "Too many failed attempts. For your security, please try again later.";

    // ----------------------------------------
    // SYSTEM / NETWORK ERRORS (Our fault / Internet fault)
    // ----------------------------------------
    case 'auth/network-request-failed':
      return "Network error. Please check your internet connection and try again.";

    case 'auth/configuration-not-found':
    case 'auth/operation-not-allowed':
      // This happens if you forgot to enable Email/Password signin in the Firebase Console
      return "signin is temporarily unavailable due to a server configuration issue.";

    // ----------------------------------------
    // THE DEFAULT FALLBACK
    // ----------------------------------------
    default:
      // Instead of "Backend crashed", we make it clear that the auth process failed,
      // prompting them to verify their details first without causing alarm.
      return "Authentication failed. Please verify your details and try again.";
  }
};