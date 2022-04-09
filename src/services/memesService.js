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

    return addDoc(collectionRef(db), doc);
}

export async function readAllMemes(db) {
    const snapshot = await getDocs(collectionRef(db));
    return snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
}

export async function readMeme(db, memeId) {
    const doc = await getDoc(docRef(db, memeId));
    return { ...doc.data(), id: doc.id };
}

export async function updateMeme(db, meme, memeId) {
    const doc = {
        ...meme,
        updatedAt: serverTimestamp()
    };

    return updateDoc(docRef(db, memeId), doc);
}

export async function deleteMeme(db, memeId) {
    return deleteDoc(docRef(db, memeId));
}
