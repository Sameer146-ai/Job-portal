import userModel from "../model/user.js";
import jobApplicationModel from "../model/jobApplications.js";
import { v2 as cloudinary } from "cloudinary";
import jobModel from "../model/job.model.js";

// Get user Data
export async function getUserData(req, res) {
  const userId = req.auth.userId;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// Apply for a job
export async function applyForJob(req, res) {
  const { jobId } = req.body;

  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await jobApplicationModel.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.json({
        success: false,
        message: "already applied",
      });
    }

    const jobData = await jobModel.findById(jobId);

    if (!jobData) {
      return res.json({
        success: false,
        message: "job not found",
      });
    }

    await jobApplicationModel.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.json({
      success: true,
      message: "Applied Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// Get User Job Applications
export async function getUserJobApplications(req, res) {
  try {
    const userId = req.auth.userId;

    const applications = await jobApplicationModel
      .find({ userId })
      .populate("userId", "name email image resume")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res.json({
        success: false,
        message: "No Job Application found",
      });
    }

    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// update user resume
export async function updateUserResume(req, res) {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;
    const userData = await userModel.findById(userId);

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
        resource_type: "auto",
      });
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    return res.json({
      success: true,
      message: "Resume updated",
      resume: userData.resume,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}
