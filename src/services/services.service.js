import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const servicesCol = collection(db, 'services');


export async function getServices() {
    return (await getDocs(servicesCol)).docs.map(doc => ({...doc.data()}))
}