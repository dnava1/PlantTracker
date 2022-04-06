import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tracker from "./Pages/Tracker"
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import { useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "./firebaseConfiguration";



function App() {
  const[isAuth, setIsAuth] = useState(false);

 

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
      
    })
  };

  

  return (
    <Router>
     
      
      <div>
        <h1>
          
        </h1>
      </div>
      <Routes>
        
        

        <Route path="/" element={<SignIn setIsAuth={setIsAuth}/>} />
        <Route path="/tracker" element={<Tracker isAuth={isAuth}/>} />
      
      </Routes>
    </Router>
  );
}

export default App;
