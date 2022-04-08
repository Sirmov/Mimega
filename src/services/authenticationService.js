import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { clearUserData, saveUserData } from './storageService';

export async function login(auth, email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userData = userCredential.user;
        saveUserData(userData);
        return userData;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        console.log(errorCode);
        console.log(errorMessage);
    }
}

export async function register(auth, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userData = userCredential.user;
        saveUserData(userData);
        return userData;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        console.log(errorCode);
        console.log(errorMessage);
    }
}

export async function logout(auth) {
    try {
        await signOut(auth);
        clearUserData();
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        console.log(errorCode);
        console.log(errorMessage);
    }
}
