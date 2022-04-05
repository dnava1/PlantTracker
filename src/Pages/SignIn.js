import React from 'react';
import {auth, provider } from "../firebaseConfiguration";
import {signInWithPopup} from "firebase/auth";
function SignIn({ setIsAuth }) {
    const signInWithGoogle = () =>{
        signInWithPopup(auth, provider).then((result) =>{
            localStorage.setItem("isAuth", true);
            setIsAuth(true)
        })
    };
  return (
    <div className='SignInPage'>

        <p>Sign In With Google to Continue</p>
        <button className="login-with-google-btn"
        onClick={signInWithGoogle}>
            Sign in with Google
        </button>
        </div>
  );
}

export default SignIn;