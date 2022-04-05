
import './App.css';


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tracker from "./Pages/Tracker"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tracker/>} />
      
      </Routes>
    </Router>
  );
}

export default App;
