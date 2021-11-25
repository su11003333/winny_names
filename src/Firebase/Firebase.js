import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const provider = new firebase.auth.GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyBW30VMBsqp6-HmsRXd4TYhcQv8uQWD3PQ",
  authDomain: "winnie-names.firebaseapp.com",
  databaseURL: "https://winnie-names-default-rtdb.firebaseio.com",
  projectId: "winnie-names",
  storageBucket: "winnie-names.appspot.com",
  messagingSenderId: "895739953737",
  appId: "1:895739953737:web:36f2fd25a19055b86e3598",
  measurementId: "G-GJP0ZGS3HQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, provider, storage };
