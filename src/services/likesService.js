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
    where,
    writeBatch,
    increment,
    arrayUnion,
    arrayRemove
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
    const likeId = generateLikeId(userUid, memeId);

    const like = {
        createdAt: serverTimestamp(),
        memeId,
        ownerId: userUid
    };

    try {
        const batch = writeBatch(db);
        // Create like document
        batch.set(docRef(db, likeId), like);
        // Increment meme likes and add user uid to who liked array
        batch.update(doc(db, 'memes', memeId), {
            likes: increment(1),
            whoLiked: arrayUnion(userUid),
            likeId: likeId,
            operation: 'like'
        });
        return await batch.commit();
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
    const likeId = generateLikeId(userUid, memeId);

    try {
        const batch = writeBatch(db);
        // Delete like document
        batch.delete(docRef(db, likeId));
        // Decrement meme likes and remove user uid from who liked array
        batch.update(doc(db, 'memes', memeId), {
            likes: increment(-1),
            whoLiked: arrayRemove(userUid),
            likeId: likeId,
            operation: 'unlike'
        });
        await deleteDoc(docRef(db, likeId));
    } catch (error) {
        handleError('Request', error);
    }
}

function generateLikeId(userUid, memeId) {
    // Generate like id based on user id and meme id
    return userUid.slice(0, 10) + memeId.slice(10);
}
