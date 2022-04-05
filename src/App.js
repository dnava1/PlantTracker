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
      window.location.pathname = "/signin";
      
    })
  };

  return (
    <Router>
      <nav>
        {isAuth ?<Link to="/"> Tracker</Link>:""}
        <Link to="/home"> Home</Link>
        {!isAuth ? <Link to="/signin"> Log In</Link> : <button onClick={signUserOut}>Log Out</button>}
      </nav>
      <Routes>
        <Route path="/" element={<Tracker/>} />
        <Route path="/signin" element={<SignIn setIsAuth={setIsAuth}/>} />
        <Route path="/home" element={<Home/>} />
      
      </Routes>
    </Router>
  );
}

export default App;
