import React from 'react'
import { useState, useEffect} from "react";
import { db } from "../firebaseConfiguration"
import { collection, getDocs, addDoc, updateDoc, doc,deleteDoc} from "firebase/firestore";
import { useNavigate} from 'react-router-dom';
import { signOut } from "firebase/auth"
import { auth } from "../firebaseConfiguration";


function Tracker({ }) {
  const [newPlant, setNewPlant] = useState("")
  const [newHealth, setNewHealth] = useState("")
  const [newWatered, setNewWatered] = useState("")
  const[isAuth, setIsAuth] = useState(false);

  const [plants, setPlants] = useState([]);
  const plantsRef = collection(db, "plants");

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
      
    })
  };

  //this does the CREATE part, allows user to add plant with name, health, and watered
 const createPlant = async () => {
    await addDoc(plantsRef, {name: newPlant, health: newHealth, watered: newWatered});
 
   };
   //updates health and watered
   const updatePlant = async (id) => {
     const plantDoc = doc(db, "plants", id);
     const newFields = {health: newHealth, watered: newWatered}
     await updateDoc(plantDoc, newFields)
 
   }
   const deletePlant = async (id) => {
     const plantDoc = doc(db, "plants", id);
     await deleteDoc(plantDoc);
 
   }
   //sets up the link to collection, gets data
   useEffect(() => {
     const getPlants = async () => {
       const data = await getDocs(plantsRef);
       setPlants(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
     };
     getPlants();
   });

   let navigate = useNavigate();

   useEffect(() => {
       if (!localStorage.getItem('isAuth')){
           navigate("/");
       }else if(localStorage.getItem('isAuth')){
           navigate("/tracker")

       }
       

   }, [])

  return (
    <div className="App">

        <button className="logOut" onClick={signUserOut}> Log Out</button> <div><div></div></div>
        <input placeholder="Name..." onChange={(event) =>{setNewPlant(event.target.value)}}/> 
      <input placeholder="Health..." onChange={(event) =>{setNewHealth(event.target.value)}}/>
      <input placeholder="Watered..." onChange={(event) =>{setNewWatered(event.target.value)}}/>

      <button onClick={createPlant}> Create Plant</button>
      {plants.map((plant) => {
        return(
          <div> 
            {" "} 
            <h1>Name: {plant.name}</h1>
            <h1>Health: {plant.health}</h1>
            <h1>Watered: {plant.watered}</h1>
            <input placeholder= "Health..." onChange={(event) =>{setNewHealth(event.target.value)}}/> 
            <input placeholder= "Watered..." onChange={(event) =>{setNewWatered(event.target.value)}}/>
            <button onClick={() => {updatePlant(plant.id, plant.health, plant.watered)}}> Update   </button>
            <button onClick={() => {deletePlant(plant.id)}}>Delete Plant</button>
          </div>
        )
      })}
      
    </div>
  )
}

export default Tracker;