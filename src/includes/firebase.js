import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDSaLPHqF2TOxVbs72Ej9LLCghGip0SEOc",
    authDomain: "set-list-manager.firebaseapp.com",
    projectId: "set-list-manager",
    storageBucket: "set-list-manager.appspot.com",
    messagingSenderId: "980438298297",
    appId: "1:980438298297:web:b624266abbb0c4685df568",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const tracksCollection = db.collection("tracks");
const categoriesCollection = db.collection("categories");

export { db, storage, tracksCollection, categoriesCollection };
