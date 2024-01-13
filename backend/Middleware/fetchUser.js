const cookie=require('cookie-parser')
const jwt=require('jsonwebtoken');


const success=false
const fetchUser=async(req,res,next)=>{
    try {
       
        const authToken=req.cookies.authToken;
       
        if(!authToken){
            return res.json({success,error:"Please autheticate with valid token"})
        }        
        
        const user=jwt.verify(authToken,process.env.JWT_SECRET);
        req.user=user.user; 
        next();
        
    } catch (error) {
        res.status(400).json({error:"Please authenticate using a valid token"});
        
    }

}

module.exports=fetchUser