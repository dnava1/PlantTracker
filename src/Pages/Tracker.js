import React from 'react'
import { useState, useEffect} from "react";
import { db } from "../firebaseConfiguration"
import { collection, getDocs, addDoc, updateDoc, doc,deleteDoc, setDoc} from "firebase/firestore";
import { useNavigate} from 'react-router-dom';
import { signOut } from "firebase/auth"
import { auth } from "../firebaseConfiguration";
import { getAuth, onAuthStateChanged } from "firebase/auth";



function Tracker({ }) {
  const [newPlant, setNewPlant] = useState("")
  const [newHealth, setNewHealth] = useState("")
  const [newWatered, setNewWatered] = useState("")
  const [newFertilized, setNewFertilized] = useState("")
  const[isAuth, setIsAuth] = useState(false);
  const[authUser, setAuthUser] = useState();

  const [plants, setPlants] = useState([]);
  //this gets the users collection at a specific user ID with collection plants inside
  const plantsRef = collection(db, "users/" + authUser +"/plants");

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
      
    })
  };
  
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) 
    {
      setAuthUser(user.uid);
    } else
    {
    // User is signed out
    navigate("/");
    }
  });

  //this does the CREATE part, allows user to add plant with name, health, and watered
 const createPlant = async () => {
   await addDoc(plantsRef, {name: newPlant, health: newHealth, watered: newWatered, fertilized: newFertilized});
  };
   //updates health and watered
   const updatePlant = async (id) => {
     const plantDoc = doc(db, ("users/" + authUser +"/plants"), id);
     const newFields = {health: newHealth, watered: newWatered, fertilized: newFertilized}
     await updateDoc(plantDoc, newFields)
   }
   //deletes plant
   const deletePlant = async (id) => {
     const plantDoc = doc(db, "users/" + authUser +"/plants", id);
     await deleteDoc(plantDoc);
   }
   //sets up the link to collection, gets data, id helps us change plant values at specific document id
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
        <button className="logOut" onClick={signUserOut}> Log Out</button> 
        <div className='space'></div>
        <h1 className='title'> Plant Tracker🌱</h1>
        <input placeholder="Name..." onChange={(event) =>{setNewPlant(event.target.value)}}/> 
      <input placeholder="Health..." onChange={(event) =>{setNewHealth(event.target.value)}}/>
      <input placeholder="Watered..." onChange={(event) =>{setNewWatered(event.target.value)}}/>
      <input placeholder="Fertilized..." onChange={(event) =>{setNewFertilized(event.target.value)}}/>
      {"\n"}
      <div>
      <button className= "create" onClick={createPlant}> Create Plant 🌵</button>
      </div>
      <div className='space1'></div>
      {plants.map((plant) => {
        return(
          <div> 
            {" "} 
            <div className='styleWrapper'>
            <h1>Name: {plant.name}</h1>
            <h1>Health: {plant.health}</h1>
            <h1>Watered: {plant.watered}</h1>
            <h1>Fertilized: {plant.fertilized}</h1>
            </div>
            <input placeholder= "Health..." onChange={(event) =>{setNewHealth(event.target.value)}}/> 
            <input placeholder= "Watered..." onChange={(event) =>{setNewWatered(event.target.value)}}/>
            <input placeholder= "Fertilized..." onChange={(event) =>{setNewFertilized(event.target.value)}}/>{"\n"}
            <div>
            <button className ="update" onClick={() => {updatePlant(plant.id, plant.health, plant.watered, plant.fertilized)}}> Update 🔄 </button>
            {"\n"}
            <button className ="delete" onClick={() => {deletePlant(plant.id)}}>Delete ❌</button>
            </div>
            <div className='space'></div>
          </div>
        )
      })}
    </div>
  )
}

export default Tracker;