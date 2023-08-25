const bcryptjs=require("bcryptjs")
const mongoose=require("mongoose")
const jwt= require('jsonwebtoken')


const user=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    avatar:{
        type:String,
       
    },
    email:{
        type:String,
        required:[true, "Please enter your email"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Please enter your password"],
        select:false
        
    },
    
},{timestamps:true})

user.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password= await bcryptjs.hash(this.password,10)
})

user.methods.comparePassword=function(enteredPassword){
    return  bcryptjs.compare(enteredPassword,this.password)
}

user.methods.getJwtToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
         expiresIn:process.env.JWT_EXPIRES
    })
}




const User=mongoose.model("user",user)

module.exports=User