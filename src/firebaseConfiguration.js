import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyDqGgjhMD0C2gqDpulb_wgbwzfPB6Kx_L8",
  
    authDomain: "planttracker-8c410.firebaseapp.com",
  
    projectId: "planttracker-8c410",
  
    storageBucket: "planttracker-8c410.appspot.com",
  
    messagingSenderId: "820697267907",
  
    appId: "1:820697267907:web:47da938d2ca820775fec76",
  
    measurementId: "G-W31YFYZNC0"
  
  };
  
  
  const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);

  export const db = getFirestore(app);
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();