import { assets } from "../../assets/assets";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Add.css";


const Add = ({url}) => {

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) =>({...data,[name]:value}));
    }

    const onSubmitHandler = async(event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        
        const response = await axios.post(`${url}/api/food/add`,formData);
        if(response.data.success){
            console.log("Data Added");
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad"
            });
            setImage(false);
            toast.success(response.data.message);
        }
        else{
            console.log(response.data.message);
            toast.error(response.data.message);
            console.log(response.data.error);
        }
    }

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <b>Upload image</b>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="type here" required />
        </div>
        <div className="add-product-description flex-col">
          <p>Production Description</p>
          <textarea
            onChange={onChangeHandler} 
            value={data.description}
            className="description"
            rows="6"
            name="description"
            placeholder="write description here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              min={0}
              name="price"
              placeholder="20"
            />
          </div>
        </div>
        <button  type="submit" className="add-btn">
         ADD
        </button>
      </form>
    </div>
  );
};



export default Add;
