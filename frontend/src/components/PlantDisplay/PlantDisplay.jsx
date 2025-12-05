import React, { useContext } from 'react';
import './PlantDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import PlantItemCard from '../PlantItem/PlantItemCard';
import { Link } from 'react-router-dom';

const PlantDisplay = ({ category, name }) => {
  const { plant_list } = useContext(StoreContext);
  console.log("PlantDisplay - category:", category, "name:", name);
  
  return (
    <div className='plant-display' id='plant-display'>
      <h2>Variety Of Plants!</h2>
      <div className="plant-display-list">
        {plant_list
          .filter((item) => {
            const matchCategory = category === "All" || item.category === category;
            const matchName = name === "" || item.name.toLowerCase().includes(name.toLowerCase());

            return matchCategory && matchName;
          })
          .map((item) => (
            <PlantItemCard
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))
        }

      </div>
    </div>
  );
};

export default PlantDisplay;
