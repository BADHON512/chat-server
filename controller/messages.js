const express=require("express")
const Messages = require("../model/messages")
const router=express.Router()


router.post("/create-message",async(req,res)=>{
    const newMessage= await Messages(req.body)
    try {
        const saveMessage=await newMessage.save()
        res.status(200).json({
            success:true,
            saveMessage
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/get-message/:id",async(req,res)=>{
    try {
        const message=await Messages.find({
            conversationId:req.params.id
        })
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error)  
    }
})

module.exports =router