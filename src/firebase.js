import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAuzmvnkpqeHyPU0i39y2eLJ_RNfMCmPgI",
    authDomain: "instagram-2289e.firebaseapp.com",
    databaseURL: "https://instagram-2289e.firebaseio.com",
    projectId: "instagram-2289e",
    storageBucket: "instagram-2289e.appspot.com",
    messagingSenderId: "994000784925",
    appId: "1:994000784925:web:6f57a6c9335c1c55bc80f4",
    measurementId: "G-YB4ECRDN05"
})

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };