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
    limitToLast,
    where
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
    recent: (db, memeId) => query(collectionRef(db), orderBy('createdAt', 'asc'), where('memeId', '==', memeId)),
    recentFirstPage: (db, memeId) =>
        query(collectionRef(db), orderBy('createdAt', 'asc'), where('memeId', '==', memeId), limit(pageSize)),
    recentNextPage: (db, memeId, last) =>
        query(
            collectionRef(db),
            orderBy('createdAt', 'asc'),
            where('memeId', '==', memeId),
            startAfter(last),
            limit(pageSize)
        ),
    recentPreviousPage: (db, memeId, first) =>
        query(
            collectionRef(db),
            orderBy('createdAt', 'asc'),
            where('memeId', '==', memeId),
            endBefore(first),
            limitToLast(pageSize)
        )
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

export async function readCommentsFirstPage(db, memeId) {
    try {
        const snapshot = await getDocs(queries.recentFirstPage(db, memeId));

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

export async function readCommentsPage(db, memeId, isNext) {
    try {
        let query = isNext
            ? queries.recentNextPage(db, memeId, lastDocument)
            : queries.recentPreviousPage(db, memeId, firstDocument);
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

export async function readAllComments(db, memeId) {
    try {
        const snapshot = await getDocs(queries.recent(db, memeId));
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
