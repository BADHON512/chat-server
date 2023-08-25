const mongoose =require("mongoose")

const MessagesSchema=mongoose.Schema({
    conversationId:{
        type:String
    },
    senderId:{
        type:String
    },
    text:{
        type:String
    },
   
},{ timestamps:true})


const Messages=mongoose.model("messages",MessagesSchema)
module.exports=Messages