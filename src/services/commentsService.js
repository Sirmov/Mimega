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
    startAfter,
    endBefore,
    limitToLast
} from 'firebase/firestore';
import { handleError } from '../utils/errorHandler';
import { getUserDisplayName, getUserUid } from './authenticationService';

// Useful functions to get references
const collectionPath = 'comments';
const collectionRef = (db) => collection(db, collectionPath);
const docRef = (db, docId) => doc(db, collectionPath, docId);

// Variables used for pagination
const pageSize = 3;
let firstDocument = null;
let lastDocument = null;

// Comments queries
const queries = {
    recent: (db) => query(collectionRef(db), orderBy('createdAt', 'desc')),
    recentFirstPage: (db) => query(collectionRef(db), orderBy('createdAt', 'desc'), limit(pageSize)),
    recentNextPage: (db, last) => query(collectionRef(db), orderBy('createdAt', 'desc'), startAfter(last), limit(pageSize)),
    recentPreviousPage: (db, first) => query(collectionRef(db), orderBy('createdAt', 'desc'), endBefore(first), limitToLast(pageSize)),
};

export async function createComment(db, auth, comment) {
    const timestamp = serverTimestamp();

    const doc = {
        ...comment,
        createdAt: timestamp,
        updatedAt: timestamp,
        ownerId: getUserUid(auth),
        author: getUserDisplayName(auth)
    };

    try {
        return await addDoc(collectionRef(db), doc);
    } catch (error) {
        handleError('Request', error);
    }
}

export async function readCommentsFirstPage(db) {
    try {
        const snapshot = await getDocs(queries.recentFirstPage(db));

        // Update first and last document
        firstDocument = snapshot.docs[0];
        lastDocument = snapshot.docs[snapshot.docs.length - 1];

        return snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
    } catch (error) {
        handleError('Request', error);
    }
}

export async function readCommentsPage(db, isNext) {
    try {
        let query = isNext ? queries.recentNextPage(db, lastDocument) : queries.recentPreviousPage(db, firstDocument);
        const snapshot = await getDocs(query);

        // Update first and last document
        firstDocument = snapshot.docs[0];
        lastDocument = snapshot.docs[snapshot.docs.length - 1];

        return snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
    } catch (error) {
        handleError('Request', error);
    }
}

export async function readAllComments(db) {
    try {
        const snapshot = await getDocs(queries.recent(db));
        return snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
    } catch (error) {
        handleError('Request', error);
    }
}

export async function readComment(db, commentId) {
    try {
        const doc = await getDoc(docRef(db, commentId));
        return { ...doc.data(), id: doc.id };
    } catch (error) {
        handleError('Request', error);
    }
}

export async function updateComment(db, comment, commentId) {
    try {
        const doc = {
            ...comment,
            updatedAt: serverTimestamp()
        };

        return await updateDoc(docRef(db, commentId), doc);
    } catch (error) {
        handleError('Request', error);
    }
}

export async function deleteComment(db, commentId) {
    try {
        return await deleteDoc(docRef(db, commentId));
    } catch (error) {
        handleError('Request', error);
    }
}
