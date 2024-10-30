import axios from "axios";
import { toast } from "react-toastify";

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
      toast.error("Failed to upload image, please try again!");
      console.error("Failed to upload image:", err);
      throw err;
    }
  };
  
  // Function to update user information
  const updateUser = async (userId, newUserData) => {
    try {
      if (process.env.REACT_APP_MODE === "development") {
        await axios.put(`/users/${userId}`, newUserData, { withCredentials: true });
      } else {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/${userId}`, newUserData, {
          withCredentials: true,
        });
        if(res.data.status === 'success') {
          toast.success("User Profile Updated Successfully!");
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update profile. Please try again.";
      toast.error(errorMessage);
      console.error(err);
      throw err;
    }
  };
  
  // Function that handles the entire process of updating user profile
  export const handleUpdateUser = async (user, info, file, setOpen) => {
    try {
      let newUser = { ...info };
  
      // If a file is provided, upload it to Cloudinary and get the URL
      if (file) {
        const imageUrl = await uploadImage(file);
        newUser.profilePicture = imageUrl;
      }
  
      // Update user information (whether or not there is an image)
      await updateUser(user._id, newUser);
  
      setOpen(false);
      window.location.reload(); // Optional, to refresh the user info on the page
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

// Function to handle the post editing logic
export const editPost = async (id, info, selectedPhotos, newFiles, rating, tags) => {
  // Step 1: Handle photo deletions
  const photosToDelete = Array.from(selectedPhotos);
  const updatedPhotos = info.photos.filter((photo) => !photosToDelete.includes(photo));

  // Step 2: Handle new photo uploads
  let uploadedPhotos = [];
  if (newFiles.length > 0) {
    uploadedPhotos = await Promise.all(
      newFiles.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dmjd7myiw/image/upload",
          data
        );
        return uploadRes.data.url; // Assuming response contains the URL
      })
    );
  }

  // Step 3: Merge the updated photos with uploaded photos
  const finalPhotos = [...updatedPhotos, ...uploadedPhotos];

  // Step 4: Create the updated post object
  const editpost = {
    ...info,
    photos: finalPhotos,
    rating: rating,
    tags: tags
  };

  // Step 5: Make the API call to update the post
  try {
    const apiUrl =
      process.env.REACT_APP_MODE === "development"
        ? `/posts/${id}`
        : `${process.env.REACT_APP_API_URL}/posts/${id}`;

    const res = await axios.put(apiUrl, editpost, { withCredentials: true });
    if(res.data.status === 'success') {
      toast.success("Post Created Successfully!");
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Failed to update post. Please try again.";
    toast.error(errorMessage);
    console.error(err);
    throw err;
  }
};

// Function to update a comment
export const updateComment = async (commentId, comment) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, { comment }, {withCredentials: true});
      if(response.data.status === 'success') {
        toast.success("Comment Updated Successfully!");
      }
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update comment. Please try again.";
      toast.error(errorMessage);
      console.error(err);
      throw err;
    }
  };
