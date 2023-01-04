import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
    },
}, { timestamps: true });

export default mongoose.model("Post", postSchema);
