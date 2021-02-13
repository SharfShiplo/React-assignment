import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBVSsbdAH8Xrf4Gb9aB0qyQNP-J_KhmRyc",
  authDomain: "instagram-clone-6e2fd.firebaseapp.com",
  projectId: "instagram-clone-6e2fd",
  storageBucket: "instagram-clone-6e2fd.appspot.com",
  messagingSenderId: "970742030539",
  appId: "1:970742030539:web:e3b9b24619de65668c7b4e",
  measurementId: "G-4WNST0M2NH",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
