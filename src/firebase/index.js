// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwMo7Mb2pF1BdNdig_68rU6ygJaxJJmoM",
  authDomain: "sweet-cake-64247.firebaseapp.com",
  projectId: "sweet-cake-64247",
  storageBucket: "sweet-cake-64247.appspot.com",
  messagingSenderId: "441239627177",
  appId: "1:441239627177:web:da8c20c9384881945550b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getData = () => getFirestore(app); 