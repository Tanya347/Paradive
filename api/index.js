import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js"
import { errorHandler } from "./utils/errorHandler.js";
import { AppError } from "./utils/customError.js";
import cookieParser from "cookie-parser";
import {rateLimit} from 'express-rate-limit';
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors"

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1);
})

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7700;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

app.use(helmet());

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.use(express.json({limit: '10kb'}));
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT,
  credentials: true
}))

if(process.env.NODE_ENV === 'development')
  app.use(morgan("common"));

app.use(ExpressMongoSanitize());
app.use(xss());
app.use(hpp());

const limiter = rateLimit({
  max: 100,
  windowMs: 60*60*1000,
  message: "Too many requests, please try again in an hour!",
})

app.get('/', (req, res) => { res.send('Hello from Express!') });
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

// error handling middleware
app.use(errorHandler);


const server = app.listen(PORT, () => {
  console.log("Listening on port 7700");
  connect();
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  })
})

