import User from "../models/User.js";
import {promisify} from 'util';
import jwt from "jsonwebtoken";
import { AppError } from "../utils/customError.js";
import { catchAsync } from "../utils/catchAsync.js";


const signToken = id => {
  return jwt.sign({id}, process.env.JWT, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user, statusCode, res) => {

  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
    httpOnly: true,
    sameSite: 'None',
    secure: true
  }

  if(process.env.NODE_ENV === 'production')
    cookieOptions.secure = true

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user
  })
}

export const register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({ 
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    profilePicture: req.body.profilePicture,
    desc: req.body.desc,
    role: req.body.role
  });

  createSendToken(newUser, 201, res);
});


export const login = catchAsync(async (req, res, next) => {

  const {email, password} = req.body;

  if(!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email}).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  } 

  createSendToken(user, 200, res);

});

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if(req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if(!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT);
  const freshUser = await User.findById(decoded.id);

  if(!freshUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }

  if(freshUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please login again.', 401));
  }

  req.user = freshUser;
  next();
})

export const restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  })
}

export const isOwner = (model) => catchAsync(async (req, res, next) => {

  const resource = await model.findById(req.params.id);
  
  if(!resource) {
    return next(new AppError('Resource not found!', 404));
  }

  if((resource.author && resource.author.toString() !== req.user.id) && (resource._id && resource._id.toString() !== req.user.id)) {
    return next(new AppError('You do not have permission to perform this action!', 403));
  }

  next();
});

export const logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
  res.status(200).json({
    status: 'success', 
    message: "Successfully logged out"
  })
})

export const updatePassword = catchAsync(async(req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  if(!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401))
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    user,
    token,
  });
})



