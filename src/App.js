import { useState, useEffect} from "react";
import './App.css';
import {db} from "./firebaseConfiguration";
import { collection, getDocs} from "firebase/firestore";

function App() {
  const [plants, setPlants] = useState([]);
  const plantsRef = collection(db, "plants");

  useEffect(() => {
    const getPlants = async () => {
      const data = await getDocs(plantsRef);
      setPlants(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };
    getPlants();
  });
  return (
    <div className="App">
      {plants.map((plant) => {
        return(
          <div> 
            {" "}
            <h1>Name: {plant.name}</h1>
            <h1>Healh: {plant.health}</h1>
            <h1>Watered: {plant.watered}</h1>
          </div>
        )
      })}
      <h1>Name</h1>
      
    </div>
  );
}

export default App;
