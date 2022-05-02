import {
    collection,
    doc,
    setDoc,
    addDoc,
    getDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    serverTimestamp,
    query,
    orderBy,
    limit,
    startAfter,
    where
} from 'firebase/firestore';
import { handleError } from '../utils/errorHandler';
import { getUserUid } from './authenticationService';

// Useful functions to get references
const collectionPath = 'likes';
const collectionRef = (db) => collection(db, collectionPath);
const docRef = (db, docId) => doc(db, collectionPath, docId);

const queries = {
    memeLikes: (db, memeId) => query(collectionRef(db), where('memeId', '==', memeId)),
    userLike: (db, memeId, userId) =>
        query(collectionRef(db), where('memeId', '==', memeId), where('ownerId', '==', userId))
};

export async function createLike(db, auth, memeId) {
    const userUid = getUserUid(auth);
    // Generate like id based on user id and meme id
    const likeId = `${userUid.slice(0, 10)}${memeId.slice(10)}`;

    const like = {
        createdAt: serverTimestamp(),
        memeId,
        ownerId: userUid
    };

    try {
        return setDoc(docRef(db, likeId), like);
    } catch (error) {
        handleError('Request', error);
    }
}

export async function readMemeLikes(db, memeId) {
    try {
        let query = queries.memeLikes(db, memeId);
        const snapshot = await getDocs(query);
        return snapshot.size;
    } catch (error) {
        handleError('Request', error);
    }
}

export async function readUserLike(db, auth, memeId) {
    try {
        const userId = getUserUid(auth);
        let query = queries.userLike(db, memeId, userId);
        const snapshot = await getDocs(query);
        return snapshot.size;
    } catch (error) {
        handleError('Request', error);
    }
}

export async function deleteUserLike(db, auth, memeId) {
    const userUid = getUserUid(auth);
    const likeId = `${userUid.slice(0, 10)}${memeId.slice(10)}`;
    try {
        await deleteDoc(docRef(db, likeId))
    } catch (error) {
        handleError('Request', error)
    }
}
