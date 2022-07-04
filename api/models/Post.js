import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
