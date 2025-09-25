import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./PlaceOrder.css";
import { StoreContext, } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount,token,food_list,url,cartItems,totalItems } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  });

  const onChangehandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));

  }

  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"]= cartItems[item._id];
        orderItems.push(itemInfo);
      }
      })

      let orderData = {
        address:data,
        items: orderItems,
        amount:getTotalCartAmount()+2
      }

      alert("Redirecting to Payment gateway");
      let response = await axios.post(`${url}/api/order/place`,orderData,{headers:{token}});
      if(response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url);
      }
      else{
        alert("Order failed");
        console.log(response.data.message);
      }
  }

  
  useEffect(()=>{
  if(!token || !totalItems()){
    navigate("/cart");
    }
  },[token]);

  return (
    <form action="" onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text"  onChange={onChangehandler} name="firstName" value={data.firstName} placeholder="First name"required/>
          <input type="text" onChange={onChangehandler} name="lastName" value={data.lastName} placeholder="Last name" required/>
       </div>
       <input type="email" onChange={onChangehandler} value={data.email} name="email"placeholder="Email address" required/>
       <input type="text" onChange={onChangehandler} value={data.street} name="street" placeholder="Street" required/>
       <div className="multi-fields">
          <input type="text" onChange={onChangehandler} value={data.city} name="city" placeholder="City" required/>
          <input type="text" onChange={onChangehandler} value={data.state} name="state" placeholder="State" required/>
        </div>
        <div className="multi-fields">
          <input type="text" onChange={onChangehandler} value={data.zipcode} name="zipcode" placeholder="Zip-code" required/>
          <input type="text" onChange={onChangehandler} value={data.country} name="country" placeholder="Country" required/>
        </div>
        <input type="text" onChange={onChangehandler} value={data.phone} name="phone" placeholder="Phone" required/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart total</h2>
          <div className="cart-total-details-container">
            <div className="card-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Delivery fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <b>Total</b>
              <b>
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit" >PROCEED TO PAYMENT</button>
        </div>
        {/* <div className="cart-promocode">
          <div className="cart-promocode-details">
            <p>If you have a promo code, Enter it here..</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Apply</button>
            </div>
          </div>
        </div> */}
      </div>
    </form>
  );
};

export default PlaceOrder;
