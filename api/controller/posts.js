import Post from "../models/Post.js";

export const createPost = async (req, res, next) => {

  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
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

// /getposts?type=jetskiing,canoeing,paragliding

// export const getPosts = async (req, res, next) => {
//   const types = req.query.type.split(",")
//   try {
//     const list = await Promise.all(
//       types.map((type) => {
//         const t = Post.findOne({ type: type });
//         return t;
//       })
//     );
//     res.status(200).json(list);
//   } catch (err) {
//     next(err);
//   }
// };

export const getPosts = async (req, res, next) => {
  try {
    console.log(geocoder)
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    next(err)
  }
}
