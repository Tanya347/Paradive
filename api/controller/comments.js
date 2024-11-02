import Post from "../models/Post.js";
import Comment from "../models/Comment.js"
import { catchAsync } from "../utils/catchAsync.js";

export const createComment = catchAsync(async (req, res, next) => {
    const parentPost = req.params.post;
    const author = req.user.id;
    // Create a new comment
    const newComment = new Comment({
      ...req.body,
      parentPost,
      author
    });
  
    // Save the comment to the database
    const savedComment = await newComment.save();
  
    // Find the parent post and add the comment's ID to the comments array
    await Post.findByIdAndUpdate(parentPost, {
      $push: { comments: savedComment._id }
    });
  
    res.status(201).json({
      status: "success",
      message: "Comment added successfully!"
    });
  });

export const updateComment = catchAsync(async (req, res, next) => {
  await Comment.findByIdAndUpdate(
    req.params.id,
    { $set: req.body},
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Comment updated successfully!"
  });
});

export const deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  await Post.findByIdAndUpdate(comment.parentPost, {$pull: { comments: comment._id}});
  res.status(200).json({ 
    status: "success",
    message: "Comment deleted successfully" 
  });
});

export const getComments = catchAsync(async(req, res, next) => {
  const comments = await Comment.find({parentPost: req.params.id}).populate({
    path: 'author',
    select: '_id username profilePicture'
  });
  res.status(200).json({
    status: "success",
    comments,
    message: "Comments fetched successfully"
  });
})

