import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import IdentifyPlant from './IdentifyPlant';
import ProductPage from './pages/ProductPage/ProductPage';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import { ToastContainer } from "react-toastify";


const App = () => {
  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <div className="main-content">

      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/order' element={<PlaceOrder></PlaceOrder>}></Route>
        <Route path='/verify' element={<Verify/>}></Route>
        <Route path='/MyOrders' element={<MyOrders/>}></Route>
        <Route path='/identify-plant' element={<IdentifyPlant/>}></Route>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default App
