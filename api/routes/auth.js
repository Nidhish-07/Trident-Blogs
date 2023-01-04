import express from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.post("/register", async (req, res) => {
    const salt = bcrypt.genSaltSync(8)
    const hashPassword = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })


    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(404).json("User not found")
        }

        const validPassword = bcrypt.compareSync(req.body.password, user.password)

        if (!validPassword) {
            return res.status(401).json("Username or password incorrect")
        }

        const { password, ...otherDetails } = user._doc
        res.status(200).json(otherDetails)
        
    } catch (error) {
        res.status(500).json(error)
        // console.log(error);

    }
})



export default router