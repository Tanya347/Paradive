import axios from "axios";

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

// Function to handle the post editing logic
export const editPost = async (id, info, selectedPhotos, newFiles, rating) => {
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
  };

  // Step 5: Make the API call to update the post
  try {
    const apiUrl =
      process.env.REACT_APP_MODE === "development"
        ? `/posts/${id}`
        : `${process.env.REACT_APP_API_URL}/posts/${id}`;

    await axios.put(apiUrl, editpost, { withCredentials: false });
  } catch (err) {
    console.log(err);
    throw err; // Re-throw error to handle it in the component if needed
  }
};

// Function to update a comment
export const updateComment = async (commentId, comment) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, { comment });
      return response;
    } catch (err) {
      console.log(err);
      throw err; // Re-throw the error so it can be handled in the component
    }
  };
