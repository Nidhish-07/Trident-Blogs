import express from "express"
import User from "../models/User.js"
import Post from "../models/Post.js"


const router = express.Router()

router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)

    }
})

router.put('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)

        if (post.username === req.body.username) {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updatedPost)
        } else {
            res.status(401).json("You cannot update this post")
        }
    } catch (error) {
        res.status(500).json(error)

    }
})
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {

                await Post.findByIdAndDelete(req.params.id)
                res.status(200).json("Post deleted")
            } catch (error) {

                res.status(500).json(error)
            }
        } else {
            res.status(403).json("You cannot delete this post")

        }
    } catch (error) {
        res.status(500).json(error)

    }
})

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)

    }
})
router.get("/", async (req, res) => {
    const username = req.query.username
    const category = req.query.category
    try {
        let posts

        if (username) {
            posts = await Post.find({ username })
        } else if (category) {
            posts = await Post.find({ categories: { $in: [category] } })
        }
        else {
            posts = await Post.find()
        }

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)

    }
})


export default router