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
    orderBy
} from 'firebase/firestore';
import { handleError } from '../utils/errorHandler';
import { getUserUid } from './authenticationService';

const collectionPath = 'memes';
const collectionRef = (db) => collection(db, collectionPath);
const docRef = (db, docId) => doc(db, collectionPath, docId);

const queries = {
    recent: (db) => query(collectionRef(db), orderBy('createdAt', 'desc'))
};

export async function createMeme(db, auth, meme) {
    const timestamp = serverTimestamp();

    const doc = {
        ...meme,
        createdAt: timestamp,
        updatedAt: timestamp,
        ownerId: getUserUid(auth)
    };

    try {
        return addDoc(collectionRef(db), doc);
    } catch (error) {
        handleError('Request', error);
    }
}

export async function readAllMemes(db) {
    try {
        const snapshot = await getDocs(collectionRef(db));
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

        return updateDoc(docRef(db, memeId), doc);
    } catch (error) {
        handleError('Request', error);
    }
}

export async function deleteMeme(db, memeId) {
    try {
        return deleteDoc(docRef(db, memeId));
    } catch (error) {
        handleError('Request', error);
    }
}
