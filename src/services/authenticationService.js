import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

export async function login(auth, email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        const errorMessage = error.message;
        alert(errorMessage);
        throw error;
    }
}

export async function register(auth, email, password, username) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        updateProfile(user, { displayName: username });
        return user;
    } catch (error) {
        const errorMessage = error.message;
        alert(errorMessage);
        throw error;
    }
}

export async function logout(auth) {
    try {
        await signOut(auth);
    } catch (error) {
        const errorMessage = error.message;
        alert(errorMessage);
        throw error;
    }
}

// Get user
export function getUser(auth) {
    const user = auth.currentUser;

    if (user !== null) {
        return user;
    }
}

// Get access token
export function getAccessToken(auth) {
    const user = auth.currentUser;

    if (user !== null) {
        return user.getToken();
    }
}

// Get user uid
export function getUserUid(auth) {
    const user = auth.currentUser;

    if (user !== null) {
        return user.uid;
    }
}

// Get user display name
export function getUserDisplayName(auth) {
    const user = auth.currentUser;

    if (user !== null) {
        return user.displayName;
    }
}

// Get user email
export function getUserEmail(auth) {
    const user = auth.currentUser;

    if (user !== null) {
        return user.email;
    }
}

// Get user email verified
export function emailVerified(auth) {
    const user = auth.currentUser;

    if (user !== null) {
        return userData.emailVerified;
    }
}

// Is logged in
export function isLogged() {
    const user = getUser();

    return Boolean(user);
}
