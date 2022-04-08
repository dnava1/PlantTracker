import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tracker from "./Pages/Tracker"
import SignIn from './Pages/SignIn';

import { useState } from "react"




function App() {
  const[isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn setIsAuth={setIsAuth}/>} />
        <Route path="/tracker" element={<Tracker isAuth={isAuth}/>} />
      </Routes>
    </Router>
  );
}

export default App;
