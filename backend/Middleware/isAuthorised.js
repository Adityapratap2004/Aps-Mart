const User = require("../Models/User")


const isAuthorised=async(req,res,next)=>{
    try {
        
        const user=await User.findById(req.user.id);
        if(user.role!=='admin'){
            return res.json({success:false,error:"Not authorised"})
        }
        else{
            next();
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,error:"Internal server error"})
        
    }
}

module.exports=isAuthorised