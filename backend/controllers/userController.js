import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


// Login User
const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({success:false,message:"User doesn't exist!"})
        }
        
        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.status(400).json({success:false,message:"Invalid credentials!"});
            }
        
        const token = createToken(user._id);
        res.json({success:true,message:"Logged in successfully!",token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});       
    }

    
}

const createToken = (id)=> {
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async(req,res) =>{
    const {name,email,password} = req.body;

    try {
        // checking is user already exists
        const exits = await userModel.findOne({email});
        if(exits){
            return res.json({success:false,message:"User already exists,Please go to Login!"});
        }

        // validating email
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email!"});
        }

        // checking for strong password
        if (password.length < 8) {
            return res.json({success:false,message:"Please enter a strong password!"});
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
    }

}

export {registerUser,loginUser};