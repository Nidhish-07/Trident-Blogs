import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String, require: true, unique: true,
    },
    email: {
        type: String, required: true, unique: true,
    },
    password: {
        type: String, required: true, min: 6
    },
    profilePic: {
        type: String, default: ""
    }
}, { timestamps: true })

export default mongoose.model("User", userSchema)