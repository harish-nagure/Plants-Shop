import React, { useContext } from 'react';
import './PlantItemCard.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlantItemCard = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate(); // to navigate to single product page

  return (
    <div className='plant-item'>
      <div className="plant-item-image-container">
        {/* ⚡ Only image is clickable */}
        <img 
          className='plant-item-image' 
          src={`${url}/images/${image}`} 
          alt={name} 
          onClick={() => navigate(`/product/${id}`)} 
          style={{ cursor: 'pointer' }}
        />

        {!cartItems[id] 
          ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add" /> 
          : <div className="plant-item-counter">
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
              <p>{cartItems[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
            </div>
        }
      </div>

      <div className="plant-item-info">
        <div className="plant-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="plant-item-description">{description}</p>
        <p className="plant-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default PlantItemCard;
