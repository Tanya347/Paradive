import mongoose from "mongoose";
import validator from "validator";
const Schema = mongoose.Schema

const CommentSchema = new Schema ({
    comment: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
              return validator.isLength(v, { min: 10, max: 500 });  // Comment must be between 3 and 500 characters
            },
            message: 'Comment should be between 3 and 500 characters'
        }
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
