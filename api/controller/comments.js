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

export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body},
      { new: true }
    );
    res.status(200).json(comment);
  } catch (error) {
      next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {

    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
      next(error);
  }
};

