import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [plant_list,setPlant_list] = useState([]);

  // Initialize token from localStorage only once
  const [token, _setToken] = useState(localStorage.getItem("token") || "");

  // Custom setter to sync state + localStorage
  const setToken = (newToken) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    
  };
  useEffect(() => {
    const loadData = async () => {
      await fetchPlantList();
      if (token) {
        await loadCartData(token);
      }
    };
    loadData();
  }, [token]);
  

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
    }
  };
const clearCart = () => {
  setCartItems({});
};
  const getTotalCartAmount = () => {
    let totalAmt = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = plant_list.find((product) => product._id === item);
        totalAmt += itemInfo.price * cartItems[item];
      }
    }
    return totalAmt;
  };

  const fetchPlantList = async () => {
    const response = await axios.get(url+"/api/plant/list");
    setPlant_list(response.data.data);
  }

   const loadCartData = async(token)=>{
      const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
      setCartItems(response.data.cartData);
   }

  const contextValue = {
    plant_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    clearCart
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
