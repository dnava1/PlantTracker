import React from 'react';
import {auth, provider } from "../firebaseConfiguration";
import {signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';


function SignIn({ setIsAuth }) {

    let navigate = useNavigate();
    const signInWithGoogle = () =>{
        signInWithPopup(auth, provider).then((result) =>{
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/tracker");
        })
    };
  return (
    <div className="SignInGoogle">

        
        <GoogleButton
        onClick={signInWithGoogle}>
            Sign in with Google
        </GoogleButton>
        </div>
  );
}

export default SignIn;