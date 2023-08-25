const express =require("express")
const app=express()
const cors=require("cors")
const conversation = require("./controller/conversation")
const messages = require("./controller/messages")
const user = require("./controller/user")
const path= require("path")
const cookieParser=require("cookie-parser")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use("/", express.static(path.join(__dirname,"./uploads")));



app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use("/api/v2",user)
app.use("/api/v2",conversation)
app.use("/api/v2",messages)


module.exports=app