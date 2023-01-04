import express from "express"
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"

import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import postRoute from "./routes/posts.js"
import categoryRoute from "./routes/categories.js"

const app = express()


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log("DB Connected") }).catch((error) => { throw error })



app.use(express.json())
app.use("/api/auth", authRoute)
app.use('/api/users', userRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", categoryRoute)

app.listen(8800, () => {
    console.log("Server is up and running on http://localhost:8800")
})