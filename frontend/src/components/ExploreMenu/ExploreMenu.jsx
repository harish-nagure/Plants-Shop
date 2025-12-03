import React from 'react'
import './ExploreMenu.css'
import { plant_list } from '../../assets/assets' // Renamed from menu_list to plant_list

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Plants</h1>
        <p className='explore-menu-text'>
            Discover a world of greenery! Browse our diverse collection and find your next favorite plant, from indoor greens to flowering beauties and rare exotic species. Ready to bring nature home?
        </p>
        <div className="explore-menu-list">
        {plant_list.map((item, index) => {
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
        <hr/>
    </div>
  )
}

export default ExploreMenu
