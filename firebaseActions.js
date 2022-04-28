/*import { firebaseApp } from "./firebase"
import * as firebase from 'firebase/compat/app'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export const getUsuarioActivo = () => {
    return firebase.auth().currentUser()
}

export const cerrarSesion = () => {
    return firebase.auth().signOut()
}

export const registroUsuario = async(email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    const user = userCredential.user
    console.log("REGISTRO\n",user)
}

export const loginUsuario = async(email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    const user = userCredential.user
    console.log("LOGIN\n",user)
}*/