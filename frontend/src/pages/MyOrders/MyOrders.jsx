import React, { useEffect, useContext } from "react";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = React.useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setOrders(response.data.data);

    console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="my-orders-container">
        {orders.map((order, index) => {
          return (<><div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p className="order-names">
                {order.items.map((item,index)=>{
                    if (index != order.items.length-1) {
                        return item.name+" x "+item.quantity+", "; 
                    }
                    else{
                        return item.name+" x "+item.quantity;
                    }
                    
                })}
            </p>
            <p>Items: {order.items.length}</p>
            <p>{order.amount}.00</p>
            <p><span>&#x25cf;</span><b> {order.status}</b></p>
            <button onClick={fetchOrders}>Track order</button>
          </div>
          <hr /></>)
        })}
      </div>
    </div>
  );
};

export default MyOrders;
