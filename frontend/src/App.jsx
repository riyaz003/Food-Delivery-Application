import { useContext, useEffect, useState } from "react";
// import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import BackToTop from "./components/BackToTop/BackToTop";
import { StoreContext } from "./context/StoreContext";
import PopUps from "./components/PopUps/PopUps";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {

  const [showLogin,setShowLogin] = useState(false);
  const [backToTop,setBackToTop] = useState(false);
  const {totalItems} = useContext(StoreContext);
  useEffect(()=>{
    window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
        setBackToTop(true)
      }
      else{
        setBackToTop(false)
        }
    })
  },[])

  

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      {backToTop?<BackToTop backToTop={backToTop}/>:<></>}
      {totalItems()===0?<></>:<PopUps totalItems={totalItems}/>}
      <Footer />
    </>
  );
};

export default App;
