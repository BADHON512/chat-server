const mongoose=require("mongoose")



const ConnectDB=async()=>{
  await mongoose.connect(process.env.MONGODB_URL).then((data)=>{
    console.log(`Mongodb Connected with ${data.connection.host}`)
  }).catch((err)=>{
    console.log(err)
  })
}

module.exports=ConnectDB