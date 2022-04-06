import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tracker from "./Pages/Tracker"
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import { useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "./firebaseConfiguration";
import Welcome from './Pages/Welcome';


function App() {
  const[isAuth, setIsAuth] = useState(false);

 

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/signin";
      
    })
  };

  

  return (
    <Router>
      <nav>
      
        
        
        
        
        

        <>
        <Link to="/tracker"> Tracker</Link>
        <Link to="/home"> Home</Link>
        
        </>
        
        
      </nav>
      {isAuth ? <Tracker /> :  <SignIn />}
      <div>
        <h1>hello
          <button onClick={signUserOut}></button>
        </h1>
      </div>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/home" element={<Home/>} />

        <Route path="/signin" element={<SignIn setIsAuth={setIsAuth}/>} />
        <Route path="/tracker" element={<Tracker isAuth={isAuth}/>} />
      
      </Routes>
    </Router>
  );
}

export default App;
