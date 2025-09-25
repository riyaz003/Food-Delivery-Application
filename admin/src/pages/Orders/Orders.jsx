import { useState, useEffect } from "react";
import axios from "axios";
import "./Orders.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const Orders = ({url}) => {
  const [data, setData] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.post(`${url}/api/order/adminorders`, {}, {});
    if (response.data.success) {
      setData(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const statusHandler = async(event,orderId)=> {
    const response = await axios.post(`${url}/api/order/status`,{orderId,status:event.target.value});
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrders();
    }
    else{
      toast.error(response.data.message);
    }
  }
  useEffect(() => {
    fetchAllOrders();
  },[]);

  return (
    <div className="order add">
      <h2>Orders</h2>
      <div className="order-list">
        {data.map((order, index) => {
          return (
            <div key={index} className="order-item">
                <img src={assets.parcel_icon} alt="" />
                <div className="order-item-name-address">
                  <div className="order-item-names">
                    <p>
                      {order.items.map((item, index) => {
                        if (index != order.items.length - 1) {
                          return item.name + " x " + item.quantity + ",";
                        } else {
                          return item.name + " x " + item.quantity;
                        }
                      })}
                    </p>
                  </div>
                    <p className="order-item-name">
                      {order.address.firstName + " " + order.address.lastName}
                    </p>
                    <div className="order-item-address">
                    <p>
                      {order.address.street + ", " }
                    </p>
                    <p>{order.address.city + ", "+order.address.state + ", " + order.address.zipcode}</p>
                  </div>
                  <p className="phone">+91-{order.address.phone}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>{order.amount}</p>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                    <option name="status" value="food processing">food processing</option>
                    <option name="status" value="Out for delivery">Out for delivery</option>
                    <option name="status" value="Delivered">Delivered</option>
                </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
