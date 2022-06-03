import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";

export async function signUp(email, password, name) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, {displayName: name});
        return true
    } catch (error) {
        throw error
    }
}

export async function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export function signOut(params) {
    return auth.signOut()
}