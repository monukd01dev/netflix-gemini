export const getFirstName = (displayName) => {
    // 1. Fallback if the name is missing
    if (!displayName) return "User";
    
    // 2. Trim extra spaces, split by the space character, and grab the first word
    const firstName = displayName.trim().split(" ")[0];
    
    return firstName;
};