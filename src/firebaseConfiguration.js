import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyAtF5YWQ7r12V__DlB2F9Aby5l172ia-AA",

  authDomain: "plant-tracker-37c7e.firebaseapp.com",

  projectId: "plant-tracker-37c7e",

  storageBucket: "plant-tracker-37c7e.appspot.com",

  messagingSenderId: "1066071067684",

  appId: "1:1066071067684:web:95c8968576ef9696c09cb1",

  measurementId: "G-MHNEPEFNB8"

};

  
  
  const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);

  export const db = getFirestore(app);
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();