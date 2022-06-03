import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const requestsCol = collection(db, 'requests');

export async function createRequest(data) {
    return await addDoc(requestsCol, data)
}

export async function getUserRequests(user) {
    return (await getDocs(query(requestsCol, where('userId', '==', user.uid)))).docs.map(doc => ({...doc.data(), id: doc.id, date: new Date(doc.data().date.toDate())}))
}

export async function deleteRequest(requestId) {
    return await deleteDoc(doc(requestsCol, requestId))
}

export async function updateRequest(requestId, newData) {
    return await setDoc(doc(requestsCol, requestId), newData)
}