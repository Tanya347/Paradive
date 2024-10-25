import axios from "axios";

export const createPost = async (postData, files) => {
  try {
    // Handle image uploads
    const list = await Promise.all(
      Object.values(files)?.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dmjd7myiw/image/upload",
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
    return res.data.data;
  } catch (err) {
    console.error("Failed to create post:", err);
    throw err;
  }
};

export const addComment = async (commentData, postId) => {
  try {
    // Call the API to create a new comment
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/comments/${postId}`, commentData, {withCredentials: true});
    return res.data; // Return the response data if needed
  } catch (err) {
    console.error("Failed to add comment:", err);
    throw err; // Re-throw the error to handle it in the component
  }
};
