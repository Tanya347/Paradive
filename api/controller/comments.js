import Post from "../models/Post.js";
import Comment from "../models/Comment.js"

export const createComment = async (req, res, next) => {
    const { comment, parentPost, author } = req.body;
  
    try {
      // Create a new comment
      const newComment = new Comment({
        comment,
        parentPost,
        author
      });
  
      // Save the comment to the database
      const savedComment = await newComment.save();
  
      // Find the parent post and add the comment's ID to the comments array
      await Post.findByIdAndUpdate(parentPost, {
        $push: { comments: savedComment._id }
      });
  
      res.status(201).json(savedComment);
    } catch (err) {
      next(err);
    }
  };

export const getCommentsByPost = async (req, res, next) => {
  
}

export const updateComment = async (req, res, next) => {
 
};

export const deleteComment = async (req, res, next) => {
  
};

