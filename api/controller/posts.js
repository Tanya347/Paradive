import Post from "../models/Post.js";
import User from "../models/User.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createPost = catchAsync(async (req, res, next) => {
  const newPost = new Post({
    ...req.body,
    author: req.user._id,
  });

  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  await newPost.save();
  user.posts.push(newPost);
  await user.save();

  res.status(200).json({
    status: "success",
    data: newPost,
  });
});

export const updatePost = catchAsync(async (req, res, next) => {
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedPost,
    message: "Your post has been successfully updated"
  });
});

export const deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  await User.findByIdAndUpdate(post.userId, { $pull: { posts: post._id } });

  res.status(200).json({
    status: "success",
    message: "The post has been deleted"
  });
});

export const getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate({
    path: 'comments',
    populate: {
      path: 'author',
      select: 'profilePicture _id username'
    }
  });

  res.status(200).json({
    status: "success",
    data: post
  });
});

export const getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    status: "success",
    data: posts
  });
});