import React, { useState,useContext ,useEffect} from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import PlantDisplay from '../../components/PlantDisplay/PlantDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {
  
    const [category,setCategory] = useState('All');
    const [plantName,setPlantName] = useState('');

const { username, token } = useContext(StoreContext);

  useEffect(() => {
    console.log("Existing Logged In User:");
    console.log("Name:", username);
    console.log("Phone:", localStorage.getItem("phone"));
  }, []);
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory} setPlantName={setPlantName}/>
      <PlantDisplay category={category} name={plantName}/>
      <AppDownload/>
    </div>
  )
}

export default Home
