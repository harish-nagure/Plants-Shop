import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import PlantDisplay from '../../components/PlantDisplay/PlantDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {
  
    const [category,setCategory] = useState('All');
    const [plantName,setPlantName] = useState('');
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
