import firebase from "firebase";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAwMo7Mb2pF1BdNdig_68rU6ygJaxJJmoM",
  authDomain: "sweet-cake-64247.firebaseapp.com",
  projectId: "sweet-cake-64247",
  storageBucket: "sweet-cake-64247.appspot.com",
  messagingSenderId: "441239627177",
  appId: "1:441239627177:web:da8c20c9384881945550b8"
};

const app = firebase.initializeApp(firebaseConfig);

export const getFirebase = () => app;

export const getDataBase = () => firebase.firestore();