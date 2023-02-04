import mongoose from "mongoose";
const Schema = mongoose.Schema

const CommentSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    parentPost: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {timestamps: true})

export default mongoose.model("Comment", CommentSchema);
