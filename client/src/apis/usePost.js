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
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/posts`, newPost);
    return res.data;
  } catch (err) {
    console.error("Failed to create post:", err);
    throw err;
  }
};

// Function to handle file upload to Cloudinary
const uploadImage = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "upload");

  try {
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dmjd7myiw/image/upload",
      data,
      { withcredentials: false }
    );
    return uploadRes.data.url; // Return the URL of the uploaded image
  } catch (err) {
    console.error("Failed to upload image:", err);
    throw err;
  }
};

// Function to update user information
const updateUser = async (userId, newUserData) => {
  try {
    if (process.env.REACT_APP_MODE === "development") {
      await axios.put(`/users/${userId}`, newUserData, { withcredentials: false });
    } else {
      await axios.put(`${process.env.REACT_APP_API_URL}/users/${userId}`, newUserData, {
        withcredentials: false,
      });
    }
  } catch (err) {
    console.error("Failed to update user:", err);
    throw err;
  }
};

// Function that handles the entire process of updating user profile
export const handleUpdateUser = async (user, info, file, dispatch, setOpen) => {
  try {
    let newUser = { ...info };

    // If a file is provided, upload it to Cloudinary and get the URL
    if (file) {
      const imageUrl = await uploadImage(file);
      newUser.profilePicture = imageUrl;
    }

    // Update user information (whether or not there is an image)
    await updateUser(user._id, newUser);

    // Update local state and close the modal
    dispatch({ type: "LOGIN_SUCCESS", payload: newUser });
    setOpen(false);
    window.location.reload(); // Optional, to refresh the user info on the page
  } catch (err) {
    console.error("Failed to update profile:", err);
  }
};

export const addComment = async (commentData) => {
  try {
    // Call the API to create a new comment
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/comments`, commentData);
    return res.data; // Return the response data if needed
  } catch (err) {
    console.error("Failed to add comment:", err);
    throw err; // Re-throw the error to handle it in the component
  }
};
