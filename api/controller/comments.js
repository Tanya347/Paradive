import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js"

export const createComment = async (req, res, next) => {
    
    const newComment = new Comment(req.body);
    

    try {
        const savedComment = await Comment.save();

        try {
            
        }
        catch (err) {

        }
    }
    catch(err) {

    }
};

export const updateComment = async (req, res, next) => {
 
};

export const deleteComment = async (req, res, next) => {
  
};

export const getComment = async (req, res, next) => {
  
};

export const getComments = async (req, res, next) => {
  
}
