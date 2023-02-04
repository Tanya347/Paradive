import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res, next) => {

  const newPost = new Post(req.body);
  const user = await User.findById(newPost.userId);
  try {
    const savedPost = await newPost.save();
    await user.posts.push(newPost);
    await user.save();
    res.status(200).json(savedPost);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(post.userId, {$pull: {posts: post._id}})
    res.status(200).json("the post has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    //console.log(geocoder)
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    next(err)
  }
}

