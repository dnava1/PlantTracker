import React from 'react';
import {auth, provider } from "../firebaseConfiguration";
import {signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";


function SignIn({ setIsAuth }) {

    let navigate = useNavigate();
    const signInWithGoogle = () =>{
        signInWithPopup(auth, provider).then((result) =>{
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
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