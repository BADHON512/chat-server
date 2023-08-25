const express=require("express")
const Conversation = require("../model/Conversation")

const router=express.Router()

router.post("/create-conversation", async(req,res)=>{

    const {senderId}=req.body
    const {receiverId}=req.body
    const CreateConversation= await Conversation({
        
        members:[senderId,receiverId]
    })

    try {
        const saveConversation=await CreateConversation.save()
        res.status(200).json({
            success:true,
            saveConversation,
        })
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/get-conversation/:userId",async(req,res)=>{
    try {
        const conversation=await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json({
            success:true,
            conversation
        })
    } catch (error) {
        res.status(500).json(error) 
    }
})

module.exports= router

