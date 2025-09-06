import express from "express";
import {
  changeJobApplicationStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controller/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a company
router.post("/register", upload.single("image"), registerCompany);

// Company Login
router.post("/login", loginCompany);

// get company Data
router.get("/company", protectCompany, getCompanyData);

// get applicant
router.get("/applicants", protectCompany, getCompanyJobApplicants);

// Post a Job
router.post("/post-job", protectCompany, postJob);

// get company job list
router.get("/list-job", protectCompany, getCompanyPostedJobs);

// change application status
router.post("/change-status", protectCompany, changeJobApplicationStatus);

// change Application Visibility
router.post("/change-visibility", protectCompany, changeVisibility);

export default router;
