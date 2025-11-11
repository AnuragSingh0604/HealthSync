import jwt from 'jsonwebtoken';
const authUser=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({success:false,message:"authorization denied"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        
        req.body.userId=decoded.userId;
        next();
    }catch(error){
        console.error("Error in authUser middleware:",error);
        res.status(500).json({success:false,message:error.message});
    }
}
export default authUser;