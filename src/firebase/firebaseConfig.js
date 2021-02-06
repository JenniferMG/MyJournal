import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBdVRLFVbmSxmiRQrgZrVbkCUrEJB8gaDg",
    authDomain: "journal-app-adf0b.firebaseapp.com",
    projectId: "journal-app-adf0b",
    storageBucket: "journal-app-adf0b.appspot.com",
    messagingSenderId: "72975672875",
    appId: "1:72975672875:web:d01518065dc2846fd82c6e"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}