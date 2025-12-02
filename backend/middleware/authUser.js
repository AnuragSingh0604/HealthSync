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
    }catch (error) {
    

    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please log in again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }

    
    return res.status(500).json({
      success: false,
      message: "Authentication error: " + error.message,
    });
  }
}
export default authUser;