import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) 

// placing user order from front end
const placeOrder = async(req,res) =>{

    const frontendurl = process.env.FRONTEND_URL || "http://localhost:5174/"

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency: "inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100,  
            },
            quantity:item.quantity 
        }))

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontendurl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontendurl}/verify?success=false&orderId=${newOrder._id}`,
            customer_email: req.body.address.email,
            shipping_address_collection: {
                allowed_countries: ['IN']
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 200,
                            currency: 'inr'
                        },
                        display_name: 'Delivery charges'
                    }
                }
            ],
            metadata: {
                customer_name: `${req.body.address.firstName} ${req.body.address.lastName}`,
                customer_phone: req.body.address.phone,
                customer_address: `${req.body.address.street}, ${req.body.address.city}, ${req.body.address.state}, ${req.body.address.zipcode}, ${req.body.address.country}`
            }
        });

        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
}

const verifyOrder = async(req,res) =>{
    try {
        const {success,orderId} = req.body;
        console.log("Verifying payment:", { success, orderId });
        
        // Handle both string "true"/"false" and boolean true/false
        const isSuccess = success === "true" || success === true;
        
        if (isSuccess) {
            const updatedOrder = await orderModel.findByIdAndUpdate(
                orderId,
                {payment: true},
                {new: true}
            );
            console.log("Payment updated successfully:", updatedOrder);
            res.json({success:true,message:"Payment Completed"});
        } else {
            // Instead of deleting, mark payment as failed but keep the order
            await orderModel.findByIdAndUpdate(orderId,{payment: false});
            console.log("Payment failed, order kept with payment:false");
            res.json({success:false,message:"Payment failed. Please try again."});
        }
    } catch (error) {
        console.log("Error in verifyOrder:", error);
        res.json({success:false,message:"Error processing payment verification"});
    }
} 

// user orders for frontend
const userOrders = async(req,res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


const adminOrders = async(req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:true,message:"Error"});
    }
}

// api for updating order status
const updateStatus = async(req,res) =>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Order Status Updated"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {placeOrder,verifyOrder,userOrders,adminOrders,updateStatus};
