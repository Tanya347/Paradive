import axios from "axios";
import { toast } from "react-toastify";

export const register = async (file, info) => {
  
  let profilePictureUrl;
    
  if (file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
  
    try {
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_KEY}/image/upload`,
        data,
        { withCredentials: false } 
      );
      profilePictureUrl = uploadRes.data.url;
    } catch (err) {
      toast.error("Failed to upload the image. Please try again.");
      console.error(err);
      return; 
    }
  }
  
  const newUser = {
    ...info,
    profilePicture: profilePictureUrl, 
  };
  
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      newUser,
      { withCredentials: true }
    );
  
    if (res.data.status === 'success') {
      toast.success("Registered Successfully!");
    }

    return res;
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Failed to register. Please try again.";
    toast.error(errorMessage);
    console.error(err);
    return err;
  }
}

export const createPost = async (postData, files) => {

  try {
    // Handle image uploads
    const list = await Promise.all(
      Object.values(files)?.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_KEY}/image/upload`,
          data, { withcredentials: false }
        );
        const { url } = uploadRes.data;
        return url;
      })
    );

    // Append the uploaded image URLs to post data
    const newPost = {
      ...postData,
      photos: list,
    };

    // Make a POST request to create a new post
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/posts`, newPost, {withCredentials: true});

    if(res.data.status === 'success') {
      toast.success("Post Created Successfully!");
    }
    return res.data.data;
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Failed to create post. Please try again.";
    toast.error(errorMessage);
    console.error(err);
    throw err;
  }
};

export const addComment = async (commentData, postId) => {
  try {
    // Call the API to create a new comment
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/comments/${postId}`, commentData, {withCredentials: true});
    if(res.data.status === 'success') {
      toast.success("Comment Added Successfully!")
    }
    
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Failed to add comment. Please try again.";
    toast.error(errorMessage);
    console.error(err);
    throw err;
  }
};
