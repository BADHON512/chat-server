const jwt=require("jsonwebtoken");
const User = require("../model/user");


exports.isAuthenticate=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
      return  res.json({
            message :"Please first login"
        })
    }

    const verify= await jwt.verify(token,process.env.JWT_SECRET)

    req.user= await User.findById(verify.id)
    next()

}