import express from "express"
import User from "../models/User.js"
import Post from "../models/Post.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.put('/:id', async (req, res) => {
    if (req.params.id === req.body.userId) {


        if (req.body.password) {
            const salt = bcrypt.genSaltSync(8)
            req.body.password = bcrypt.hashSync(req.body.password, salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json("User has been updated")
        }
    } else {
        res.status(401).json("You can update only your account")
    }
})
router.delete('/:id', async (req, res) => {
    if (req.params.id === req.body.userId) {
        try {
            const user = await User.findById(req.params.id)


            try {
                await Post.deleteMany({ username: user.username })
                await User.findByIdAndDelete(req.params.id)

                res.status(200).json("User has been deleted")
            } catch (error) {
                res.status(500).json(error)
            }
        } catch (error) {

            res.status(404).json("User not found")
        }
    } else {
        res.status(401).json("You can update only your account")
    }
})

router.get("/:id", async (req, res) => { 
    try {
        const user = await User.findById(req.params.id)
        const { password, ...otherDetails } = user._doc
        res.status(200).json(otherDetails)
    } catch (error) {
        res.status(500).json(error)

    }
})


export default router