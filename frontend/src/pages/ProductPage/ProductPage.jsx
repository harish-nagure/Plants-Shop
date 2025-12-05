import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const { plant_list, addToCart, cartItems, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const product = plant_list.find((p) => p._id === id);
  if (!product) return <div>Product not found!</div>;

  return (
    <div className="product-page">
      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
      <div className="product-container">
        <div className="product-image">
          <img src={`${url}/images/${product.image}`} alt={product.name} />
          
        </div>
        <div className="right-page">
            <div className="product-details">
          <h1>{product.name}</h1>
          <hr />
          <br />
          <p className="product-description">{product.description}</p>
          <p className="product-price">₹{product.price}</p>
        </div>
        <div>
            {!cartItems[id] 
            ? <button className="add-btn" onClick={() => addToCart(id)}>Add to Cart</button>
            : <div className="counter">
                <button onClick={() => removeFromCart(id)}>-</button>
                <p>{cartItems[id]}</p>
                <button onClick={() => addToCart(id)}>+</button>
              </div>
          }
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
