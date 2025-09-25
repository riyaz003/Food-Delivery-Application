import userModel from "../models/userModel.js";


// add to cart
const addToCart = async (req,res) =>{
    try {
        const userData = await userModel.findOne({_id:req.body.userId});
        const cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,messsage:"Error"});
    }

}

// remove form cart
const removeFromCart = async (req,res) =>{
    try {
    const userData = await userModel.findOne({_id:req.body.userId});
    const cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
        cartData[req.body.itemId] -= 1;
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"});
    }else[
        res.json({success:false,message:"Item not in cart"})
    ]
    } catch (error) {
        console.log(error);
        res.json({success:false,messsage:"Error"});
    }
}

// fetch user cart data
const getCart = async (req,res) =>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false,messsage:"Error"});
    }
}

export {addToCart,removeFromCart,getCart};