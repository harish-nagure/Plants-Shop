import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios";
import {toast} from "react-toastify";

const List = () => {

  const url = "https://plants-shop-backend.onrender.com"
  const [list,setList] = useState([]);

  const fetchList = async()=>{
    const response = await axios.get(`${url}/api/plant/list`);
    if (response.data.success) {
      setList(response.data.data);
      //console.log(response.data);

    } else {
      toast.error("Error");
    }
  }

  const removePlant = async (plantId) => {
    //console.log(plantId);
    const response = await axios.post(`${url}/api/plant/remove`,{id:plantId});
    fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p className='main-title'>All Plants List</p>
                <div className="add-card">

      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
          {list.map((item,index)=>{
            return(
              <div key={index} className="list-table-format">
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹ {item.price}</p>
                <button onClick={()=>removePlant(item._id)} className="cursor">Remove</button>
              </div>
            )
          })}
      </div>
      </div>
    </div>
  )
}

export default List
