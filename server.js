const app = require("./app")
const ConnectDB = require("./DB/ConnectDB")

//unHandleException
process.on("uncaughtException",(err)=>{
  console.log(err)
})

//config
if(process.env.NODE_ENV!=="production"){
  require("dotenv").config({
    path:"./config/.env"
  })
}

ConnectDB()
const server=app.listen(5000,()=>{
  console.log("server is working ")
})

process.on("unhandledRejection",(err)=>{
  console.log(err)
  server.close(()=>{
    process.exit(1)
  })
})




