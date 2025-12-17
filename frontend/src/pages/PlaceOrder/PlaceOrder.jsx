import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, plant_list, cartItems, url, clearCart } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // ONLINE PAYMENT ORDER FUNCTION (Stripe)
  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    plant_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 40,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  const navigate = useNavigate();

  // COD ORDER
  const placeCODOrder = async () => {
    let orderItems = [];
    plant_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId: userId,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 40,
      paymentMethod: "COD",
    };

    try {
      let response = await axios.post(url + "/api/order/place-cod", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        clearCart();
        navigate("/order-success", { state: { paymentType: "COD" } });
      } else {
        alert("Error placing COD order");
      }
    } catch (error) {
      console.error("COD Order error:", error);
      alert("Something went wrong while placing COD order.");
    }
  };

  const handleCOD = () => {
    placeCODOrder();
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
      alert("Please Login First !");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstname"
            onChange={onChangeHandler}
            value={data.firstname}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastname"
            onChange={onChangeHandler}
            value={data.lastname}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Id"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            value={data.zipcode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 6);
              onChangeHandler({
                target: { name: "zipcode", value },
              });
            }}
            type="tel"
            maxLength={6}
            inputMode="numeric"
            pattern="^[1-9][0-9]{5}$"
            placeholder="Pin Code"
          />{" "}
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          value={data.phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 10);
            onChangeHandler({
              target: { name: "phone", value },
            });
          }}
          type="tel"
          maxLength={10}
          inputMode="numeric"
          pattern="[6-9][0-9]{9}"
          placeholder="Phone"
        />{" "}
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}
              </b>
            </div>
          </div>

          {/* ONLINE PAYMENT */}
          <button type="submit" className="pay-btn">
            Proceed To Payment
          </button>

          {/* CASH ON DELIVERY */}
          <button
            type="button"
            className="cod-btn"
            onClick={handleCOD}
            disabled={getTotalCartAmount() === 0}
          >
            Cash On Delivery
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
