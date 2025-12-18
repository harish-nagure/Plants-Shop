import React, { useState, useContext, useEffect } from 'react'
import './ExploreMenu.css'

import { StoreContext } from '../../context/StoreContext';
import { plant_category } from '../../assets/assets'
import { assets } from '../../assets/assets';

import IdentifyPlant from '../../IdentifyPlant';


const ExploreMenu = ({ category, setCategory, setPlantName }) => {

    const [search, setSearch] = useState("");
    const [plantNamePhoto, setPlantNamePhoto] = useState("");

    console.log("Searching for:", plantNamePhoto.toLowerCase());

    useEffect(() => {
  if (search.trim().length > 0) {
    setPlantName(search);
    setCategory("All");
  } else {
    setPlantName("");
    setCategory("All");
  }
}, [search]);

    useEffect(() => {
        if (plantNamePhoto.trim().length > 0) {
            setPlantName(plantNamePhoto.toLowerCase());
            // setSearch("harish")
            setSearch(plantNamePhoto.toLowerCase())
            console.log("Value: "+plantNamePhoto)
            setCategory("All");
        }
    }, [plantNamePhoto]);


    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
        setPlantNamePhoto("");
        setCategory("All");
    };


    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Our Plants</h1>
            <p className='explore-menu-text'>
                Discover a world of greenery! Browse our diverse collection and find your next favorite plant, from indoor greens to flowering beauties and rare exotic species. Ready to bring nature home?
            </p>
             <div className='search-bar' id='search-bar'>
                <div className="search-bar-left">

                <img src={assets.search_icon} alt="" />
                <input
                    type='search'
                    placeholder='Search for plants...'
                    className='explore-search-bar'
                    value={search}
                    onChange={handleSearch}
                    />
                </div>
                <IdentifyPlant setPlantNamePhoto={setPlantNamePhoto} />
            </div>
            <div className="explore-menu-list">
                {plant_category.map((item, index) => {
                    return (
                        <div
                            onClick={() => setCategory(prev => prev === item.plant_name ? "All" : item.plant_name)}
                            key={index}
                            className='explore-menu-list-items'
                        >
                            <img className={category === item.plant_name ? "active" : ""} src={item.plant_image} alt={item.plant_name} />
                            <p>{item.plant_name}</p>
                        </div>
                    )
                })}
            </div>
            {/* <div className='search-bar' id='search-bar'>
                <div className="search-bar-left">

                <img src={assets.search_icon} alt="" />
                <input
                    type='search'
                    placeholder='Search for plants...'
                    className='explore-search-bar'
                    value={search}
                    onChange={handleSearch}
                    />
                </div>
                <IdentifyPlant setPlantNamePhoto={setPlantNamePhoto} />
            </div> */}

            <hr />

        </div>
    )
}

export default ExploreMenu
