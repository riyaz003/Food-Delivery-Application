// import React from 'react'
import './PopUps.css'
// import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const PopUps = ({totalItems}) => {
  return (
    <div className="popups">
      <div className="cart-items-popup">
        <div className="cart-items-info">
            <p>total items in Cart</p>
            <p>{totalItems()}</p>
        </div>
        <div className="cart-items-popup-button">
            <div className="cart-item-button">
                <Link to="/cart" className="cart-item-link">View Cart</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PopUps
