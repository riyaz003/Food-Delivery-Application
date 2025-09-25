import { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {

    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src={url+"/images/"+image}  alt="" className="food-item-img"/>
            {!cartItems[id]
                ?<button onClick={()=>addToCart(id)} className='addbutton'>Add+</button>
                : <div className="food-item-counter">
                   <div className="food-item-counter-dec">
                        <button onClick={()=> removeFromCart(id)} className='food-item-counter-decrementer'>-</button>
                    </div>
                    <p>{cartItems[id]}</p>
                    <div className="food-item-count-inc">
                        <button onClick={()=>addToCart(id)} className="food-item-counter-incrementer">+</button>
                    </div>
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">{price}</p>
        </div>
    </div>
  )
}

export default FoodItem
