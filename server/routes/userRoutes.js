import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controller/userController.js";
import upload from "../config/multer.js";

const userRouter = express.Router();

// get user data
userRouter.get("/user", getUserData);

// Apply for job
userRouter.post("/apply", applyForJob);

// Get applied jobs data
userRouter.get("/applications", getUserJobApplications);

// Update user profile (resume)
userRouter.post("/update-resume", upload.single("resume"), updateUserResume);

export default userRouter;
