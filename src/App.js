
import './App.css';


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tracker from "./Pages/Tracker"
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';

function App() {

  return (
    <Router>
      <nav>
        <Link to="/"> Tracker</Link>
        <Link to="/signin"> Sign In</Link>
        <Link to="/home"> Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Tracker/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/home" element={<Home/>} />
      
      </Routes>
    </Router>
  );
}

export default App;
