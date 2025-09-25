import React, { useState } from 'react'
import {toast} from "react-toastify";
import axios from "axios";
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({setShowLogin}) => {

    const [currState,setCurrentState] = useState("Sign-up");
    const {url,token,setToken} = useContext(StoreContext);
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    });

    const onChangeHandler = (event) =>{
        setData((data)=>({...data,[event.target.name]:event.target.value}));
    }

    const onLogin = async(event) =>{
        event.preventDefault();
        let newurl = url;

        if (currState==="Login") {
            newurl +="/api/user/login";
        }
        else{
            newurl +="/api/user/register";
        }

        const response = await axios.post(`${newurl}`,data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
        }
        else{
            toast.error(response.data.message);
            alert(response.data.message);
        }
    } 


  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}  alt="" />
            </div>
            <div className="login-popup-input">
                {currState==="Login"?<></>:<input type="text" onChange={onChangeHandler} name='name' value={data.name} placeholder='your name' required/>}
                <input type="email" onChange={onChangeHandler} name='email' value={data.email} placeholder='your email' required/>
                <input type="password" onChange={onChangeHandler} name='password' value={data.password} placeholder='your password' required/>
            </div>
            <button type='submit'>{currState==="Sign-up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login"?
            <p>Create a new account? <span onClick={()=>setCurrentState("Sign-up")}>Click here..</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Click here..</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup
