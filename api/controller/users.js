import User from "../models/User.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/customError.js";

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if(allowedFields.includes(el)) newObj[el] = obj[el];
  })
  return newObj;
}

export const updateUser = catchAsync(async (req, res, next) => {

  // create error if user posts password data
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError('This route is not for password updates. Please use /updatePassword.', 400));
  }

  const filteredBody = filterObj(req.body, 'username', 'email', 'desc', 'profilePicture');

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $set: filteredBody},
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser
    },
    message: "Updated your profile successfully!"
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
  await User.findByIdAndDelete(req.user.id);
  res.status(200).json({
    status: "success", 
    data: null,
    message: "User profile has been deleted"
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('posts');
  res.status(200).json({
    status: "success",
    data: user
  });
});

export const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: users
  });
});


