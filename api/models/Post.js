import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    priceRange: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    type: {
      type: String,
      max: 500,
    },
    photos: {
      type: [String],
    },
    rating: {
      type: Number,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
