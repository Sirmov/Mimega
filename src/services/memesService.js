import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    serverTimestamp,
    query,
    orderBy,
    limit,
    startAfter
} from 'firebase/firestore';
import { handleError } from '../utils/errorHandler';
import { getUserUid } from './authenticationService';

// Useful functions to get references
const collectionPath = 'memes';
const collectionRef = (db) => collection(db, collectionPath);
const docRef = (db, docId) => doc(db, collectionPath, docId);

// Variables used for pagination
const pageSize = 4;
let lastDocument = null;

// Memes queries
const queries = {
    recent: (db) => query(collectionRef(db), orderBy('createdAt', 'desc')),
    recentFirstPage: (db) => query(collectionRef(db), orderBy('createdAt', 'desc'), limit(pageSize)),
    recentPage: (db, last) => query(collectionRef(db), orderBy('createdAt', 'desc'), startAfter(last), limit(pageSize))
};

export async function createMeme(db, auth, meme) {
    const timestamp = serverTimestamp();

    const doc = {
        ...meme,
        createdAt: timestamp,
        updatedAt: timestamp,
        ownerId: getUserUid(auth),
        likes: 0,
        whoLiked: []
    };

    try {
        return await addDoc(collectionRef(db), doc);
    } catch (error) {
        handleError('Request', error);
    }
}

export async function readMemesPage(db, userUid, isFirstPage = false) {
    try {
        let query = isFirstPage ? queries.recentFirstPage(db) : queries.recentPage(db, lastDocument);
        const snapshot = await getDocs(query);

        // Return false if there are no memes left
        if (snapshot.empty) {
            return false;
        }

        // Update last document
        lastDocument = snapshot.docs[snapshot.docs.length - 1];

        return snapshot.docs.map((doc) => {
            let meme = doc.data();

            return {
                ...meme,
                id: doc.id,
                // Attach a is owner and is liked property to all memes
                isOwner: userUid === meme.ownerId,
                // This can cause performance issues when likes become bigger
                // The solution is to keep user liked memes and compare it to the current meme id
                isLiked: meme.whoLiked.some((x) => x === userUid)
            };
        });
    } catch (error) {
        handleError('Request', error);
    }
}

export async function readAllMemes(db) {
    try {
        const snapshot = await getDocs(queries.recent(db));
        return snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
    } catch (error) {
        handleError('Request', error);
    }
}

export async function readMeme(db, memeId) {
    try {
        const doc = await getDoc(docRef(db, memeId));
        return { ...doc.data(), id: doc.id };
    } catch (error) {
        handleError('Request', error);
    }
}

export async function updateMeme(db, meme, memeId) {
    try {
        const doc = {
            ...meme,
            updatedAt: serverTimestamp()
        };

        return await updateDoc(docRef(db, memeId), doc);
    } catch (error) {
        handleError('Request', error);
    }
}

export async function deleteMeme(db, memeId) {
    try {
        return await deleteDoc(docRef(db, memeId));
    } catch (error) {
        handleError('Request', error);
    }
}
