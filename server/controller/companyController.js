import companyModel from "../model/company.model.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateJwt.js";
import jobModel from "../model/job.model.js";
import { messageInRaw } from "svix";
import jobApplicationModel from "../model/jobApplications.js";

// Register a company
export async function registerCompany(req, res) {
  const { name, email, password } = req.body;

  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({
      success: false,
      message: "Missing Details",
    });
  }

  try {
    const companyExists = await companyModel.findOne({ email });
    if (companyExists) {
      return res.json({
        success: false,
        message: "Comapny already registered",
      });
    }

    // Becrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await companyModel.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// Login a Company
export async function loginCompany(req, res) {
  const { email, password } = req.body;

  try {
    const company = await companyModel.findOne({ email });

    if (await bcrypt.compare(password, company.password)) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Email or password",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// getCompany Data
export async function getCompanyData(req, res) {
  try {
    const company = req.company;

    res.json({
      success: true,
      company,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// Post a job
export async function postJob(req, res) {
  const { title, description, location, salary, level, category } = req.body;

  const companyId = req.company._id;

  console.log(companyId, {
    title,
    description,
    location,
    salary,
    level,
    category,
  });
  try {
    const newJob = new jobModel({
      title,
      description,
      location,
      salary,
      companyId: companyId,
      date: Date.now(),
      level,
      category,
    });

    await newJob.save();

    res.json({
      success: true,
      result: newJob,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// get data of job applicants in company
export async function getCompanyJobApplicants(req, res) {
  try {
    const companyId = req.company._id;

    // FInd job applications for the user and populate related data
    const applications = await jobApplicationModel
      .find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();

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

// get company posted job list
export async function getCompanyPostedJobs(req, res) {
  try {
    const companyId = req.company._id;

    const jobs = await jobModel.find({ companyId });

    // Adding  applicant no
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await jobApplicationModel.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    res.json({
      success: true,
      jobData: jobsData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// change job application status
export async function changeJobApplicationStatus(req, res) {
  try {
    const { applicationId, status } = req.body;
    const companyId = req.company._id;

    // validate status
    if (!["accepted", "rejected", "pending"].includes(status)) {
      return res.json({ success: false, message: "Invalid status" });
    }

    // find application
    const application = await jobApplicationModel
      .findById(applicationId)
      .populate("jobId");
    if (!application) {
      return res.json({ success: false, message: "Application not found" });
    }

    // check ownership
    if (application.companyId.toString() !== companyId.toString()) {
      return res.json({ success: false, message: "Not authorized" });
    }

    // update status
    application.status = status;
    await application.save();

    res.json({
      success: true,
      message: `Application ${status} successfully`,
      application,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// change job visibility
export async function changeVisibility(req, res) {
  try {
    const { id } = req.body;

    const companyId = req.company._id;

    const job = await jobModel.findById(id);

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }

    await job.save();

    res.json({ success: true, job });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}
