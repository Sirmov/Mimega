// Module handling browser storage

// Storage and user data key
const storage = sessionStorage;
const userDataKey = 'user';

// Get user data
export function getUserData() {
    const serializedUserData = storage.getItem(userDataKey);

    if (serializedUserData !== null) {
        const userData = JSON.parse(serializedUserData);
        return userData;
    }
}

// Get access token
export function getAccessToken() {
    const userData = getUserData();

    if (userData !== undefined) {
        return userData.accessToken;
    }
}

// Get user uid
export function getUserUid() {
    const userData = getUserData();

    if (userData !== undefined) {
        return userData.uid;
    }
}

// Get user display name
export function getUserDisplayName() {
    const userData = getUserData();

    if (userData !== undefined) {
        return userData.displayName;
    }
}

// Get user email
export function getUserEmail() {
    const userData = getUserData();

    if (userData !== undefined) {
        return userData.email;
    }
}

// Get user email verified
export function emailVerified() {
    const userData = getUserData();

    if (userData !== undefined) {
        return userData.emailVerified;
    }
}

// Is logged in
export function isLogged() {
    const userData = getUserData();

    return Boolean(userData);
}

// Save user data
export function saveUserData(userData) {
    storage.setItem(userDataKey, userData.toJSON());
}

// Clear user data
export function clearUserData() {
    storage.removeItem(userDataKey);
}
