import jwt from 'jsonwebtoken';


const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;

    if(!token){
        return res.json({success:false,message: 'Unauthorized, please login again'});
    }

    try {
        const decoded_token = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = decoded_token.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


export default authMiddleware;