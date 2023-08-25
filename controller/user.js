const express = require("express")
const { upload } = require("../multer")
const User = require("../model/user")
const SendToken = require("../utils/sendToken")
const router = express.Router()
const { isAuthenticate } = require("../middleware/auth")

router.post("/user-create", upload.single("avatar"), async (req, res, next) => {
    try {

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar: req.file.filename,

        }

        const user = await User.create(newUser)

        res.status(201).json({
            success: true,
            message: "Resister success full",
            user
        })

    } catch (error) {
        res.status(400).json(error)

    }

})


router.post("/user-login", async (req, res,) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password")
        console.log(user)
        if (!user) {
            return res.status(400).json({
                message: "email not found"
            })
        }
        const isPasswordValid = await user.comparePassword(password)

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "your password is wrong badhon"
            })
        }



        SendToken(user, 201, res)
    } catch (error) {
        res.status(400).json(error)

    }

})

router.get("/user", isAuthenticate, async (req, res,) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            res.json({
                message: "user not found"
            })
        }
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {

    }
})

router.get("/friend/:id", async (req, res,) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.json({
                message: "user not found"
            })
        }
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {

    }
})


router.get('/log-out', isAuthenticate, async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(201).json({
            success:true,
            message:"User Log Out Successfully"
          })
    } catch (error) {
           
    }
})


module.exports = router