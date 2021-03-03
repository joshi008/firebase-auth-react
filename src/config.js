import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
    apiKey: REACT_APP_FIREBASE_KEY,
    authDomain: REACT_APP_FIREBASE_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_SENDER_KEY,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEAS_ID,
});

export default firebaseConfig;